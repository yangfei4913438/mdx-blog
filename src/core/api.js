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

const postDirectory = path.join(process.cwd(), 'src', 'markdown', 'post');

export function getPostSlugList() {
  return fs.readdirSync(postDirectory).filter((name) => !ignoreDirs.includes(name));
}

// 返回给摘要的数据（一般用于目录类的场景）
export function getPostSummaryBySlug(locale, slug) {
  const postPath = path.join(postDirectory, slug);
  const postTime = fs.statSync(postPath);
  const fileContent = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(fileContent, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }), // 禁止日期转换
    },
  });

  const filename = String(slug).split('.md')[0];

  return {
    dirIndex: data.dirIndex, // 取出目录排序
    subDirIndex: data.subDirIndex ?? 1, // 取出二级目录排序, 不存在就是1
    index: data.index, // 取出文章排序
    dir: data.dir, // 目录
    subDir: data.subDir ?? '', // 二级目录，不存在就是空字符串
    title: data.title, // 标题
    date: dayjs(postTime.mtime).format('YYYY-MM-DD HH:mm:ss'), // 最近更新时间
    description: data.description, // 描述
    tags: data.tags, // 关键字
    slug: filename, // 路径名称
    url: locale === 'en' ? `/en/post/${filename}` : `/zh/post/${filename}`, // 访问文章路径
  };
}

// 获取三层结构数据，用于侧边栏目录
export function getSideBarInfos(locale) {
  const getObj = (arr, isSub = false) => {
    return arr.reduce((res, item) => {
      let key = item.dirIndex;
      if (isSub) {
        key = item.subDirIndex;
      }
      res[key] ? res[key].push(item) : (res[key] = [item]);
      return res;
    }, {});
  };

  const list = getPostList(locale);
  const obj = getObj(list);
  const arr = [];
  Object.entries(obj).forEach(([k, v]) => {
    const subObj = getObj(v, true);
    const subArr = [];
    Object.entries(subObj).forEach(([k1, v1]) => {
      subArr.push({
        subDirIndex: k1,
        subDir: v1[0].subDir,
        children: v1,
      });
    });
    arr.push({
      dirIndex: k,
      dir: v[0].dir,
      children: subArr,
    });
  });
  return arr;
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
export async function getPostBySlug(locale, slug) {
  const filename = slug + '.mdx';
  let postPath = path.join(postDirectory, filename);
  const isExist = fs.existsSync(postPath);
  if (!isExist) {
    postPath = path.join(postDirectory, slug + '.md');
  }
  const postTime = fs.statSync(postPath);
  const fileContent = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(fileContent, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }), // 禁止日期转换
    },
  });
  return {
    dir: data.dir, // 目录
    title: data.title, // 标题
    date: dayjs(postTime.mtime).format('YYYY-MM-DD HH:mm:ss'), // 最近更新时间
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
