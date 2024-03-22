import React from 'react';
import fs from 'fs';
import dayjs from 'dayjs';
import type { GetStaticProps } from 'next';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import rehypePrism from 'rehype-prism-plus';
import { MDXRemote } from 'next-mdx-remote';
import { components } from '@/components/markdown';

import Layout from '@/components/pages/layout';
import { siteInfo } from '@/core/config';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const fileContent = fs.readFileSync(process.cwd() + '/src/markdown/about.mdx', 'utf-8');
  const { content, data } = matter(fileContent);
  let mdxData = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism as any],
      format: 'mdx',
    },
  });
  // 更新时间戳
  const time = dayjs(data.date).toISOString();

  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['common'])),
      mdxData,
      time,
    },
  };
};

const About = ({ mdxData, time }: any) => {
  const router = useRouter();

  return (
    <Layout
      time={time}
      pageUrl={siteInfo.url + router.asPath}
      pageName={'关于本站'}
      pageDesc={'关于本站的一些信息说明'}
      keywords={'站点说明,笔记博客'}
    >
      <div className='prose max-w-none space-y-2 bg-white p-8 shadow shadow-gray-5'>
        <article className='markdown-area'>
          <MDXRemote {...mdxData} components={components} />
        </article>
      </div>
    </Layout>
  );
};

export default About;
