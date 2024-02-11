import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import dayjs from 'dayjs';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import externalLinks from 'remark-external-links';
import { ignoreDirs } from '../../project.config';
import dirOrderConfig from '@/core/config';

const postDirectory = path.join(process.cwd(), 'src', 'markdown', 'post');

// 文件路径数组
export function getPostSlugList() {
  const firstDirs = fs.readdirSync(postDirectory).filter((name) => !ignoreDirs.includes(name));
  const dirs = firstDirs.map((dir) => {
    return fs.readdirSync(path.join(postDirectory, dir)).map((p) => path.join(dir, p));
  });
  const files = dirs.flat().map((dir) => {
    return fs.readdirSync(path.join(postDirectory, dir)).map((p) => path.join(dir, p));
  });
  return files.flat();
}

// 返回给摘要的数据（一般用于目录类的场景）
export function getPostSummaryBySlug(locale, slug) {
  const postPath = path.join(postDirectory, slug);
  const fileContent = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(fileContent, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }), // 禁止日期转换
    },
  });

  const filename = String(slug).split('.md')[0];
  const dir = filename.split('/')[0];
  const subDir = filename.split('/')[1];

  return {
    index: data.index, // 取出文章排序
    dir: dir, // 目录
    dirIndex: dirOrderConfig[dir].index,
    subDir: subDir ?? '', // 二级目录，不存在就是空字符串
    subDirIndex: dirOrderConfig[dir].children[subDir] ?? 0,
    title: data.title, // 标题
    date: dayjs(data.date).format('YYYY-MM-DD HH:mm:ss'), // 最近更新时间
    description: data.description, // 描述
    tags: data.tags, // 关键字
    slug: filename, // 路径名称
    url: locale === 'en' ? `/en/post/${filename}` : `/zh/post/${filename}`, // 访问文章路径
  };
}

export function getPostList(local) {
  const slugs = getPostSlugList();
  return slugs
    .map((slug) => getPostSummaryBySlug(local, slug))
    .sort((a, b) => {
      if (a.dirIndex === b.dirIndex) {
        if (a.subDirIndex === b.subDirIndex) {
          // 大的在后面
          return a.index > b.index ? 1 : -1;
        }
        return a.subDirIndex > b.subDirIndex ? 1 : -1;
      }
      return a.dirIndex > b.dirIndex ? 1 : -1;
    });
}

// 返回给文章的数据
export async function getPostBySlug(locale, first_dir, second_dir, slug) {
  const filename = slug + '.mdx';
  let postPath = path.join(postDirectory, first_dir, second_dir, filename);
  const isExist = fs.existsSync(postPath);
  if (!isExist) {
    postPath = path.join(postDirectory, first_dir, second_dir, slug + '.md');
  }

  const fileContent = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(fileContent, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }), // 禁止日期转换
    },
  });

  return {
    dir: first_dir, // 目录
    subDir: second_dir, // 二级目录
    title: data.title, // 标题
    date: dayjs(data.date).format('YYYY-MM-DD HH:mm:ss'), // 最近更新时间
    description: data.description, // 描述
    tags: data.tags, // 关键字
    // 正文
    content: await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMdxCodeMeta, externalLinks],
        rehypePlugins: [rehypePrism, rehypeCodeTitles],
        format: 'mdx',
      },
      parseFrontmatter: false,
    }),
  };
}
