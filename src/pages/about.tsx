import Layout from '@/components/pages/layout';
import type { GetStaticProps } from 'next';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { components } from '@/components/markdown';
import React from 'react';
import fs from 'fs';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const fileContent = fs.readFileSync(process.cwd() + '/src/markdown/about.mdx', 'utf-8');
  const { content } = matter(fileContent);
  let mdxData = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      format: 'mdx',
    },
  });

  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['common'])),
      mdxData,
    },
  };
};

const About = ({ mdxData }: any) => {
  return (
    <Layout>
      <div className='space-y-2 bg-white p-8 shadow shadow-gray-5'>
        <article className='prose max-w-none'>
          <MDXRemote {...mdxData} components={components} />
        </article>
      </div>
    </Layout>
  );
};

export default About;
