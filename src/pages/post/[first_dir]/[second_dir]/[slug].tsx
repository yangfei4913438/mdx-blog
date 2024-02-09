import 'prism-themes/themes/prism-xonokai.min.css';
import { MDXProvider } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote';
import { getPostBySlug, getPostSlugList } from '@/core/api';
import { GetStaticProps, NextPage } from 'next';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../../../../ni18n.config';
import PageHeader from '@/components/pages/header';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { components } from '@/components/markdown';
import Layout from '@/components/pages/layout';

interface Path {
  params: { first_dir: string; second_dir: string; slug: string };
  locale: string;
}
// 生成静态路由表
export const getStaticPaths = async (props: { locales: string[] }) => {
  const paths: Path[] = [];
  const { locales } = props;
  locales.forEach((locale) => {
    const posts = getPostSlugList();
    posts.forEach((post) => {
      const filename = post.split('.')[0];
      const first_dir = filename.split('/')[0];
      const second_dir = filename.split('/')[1];
      const slug = filename.split('/')[2];
      paths.push({ params: { first_dir, second_dir, slug }, locale });
    });
  });
  return {
    paths,
    fallback: false,
  };
};

interface IPost {
  index: number;
  dir: string;
  subDir: string;
  title: any;
  description: string;
  date: string;
  tags: any;
  slug: any;
  content: any;
}

interface IProps {
  post: IPost;
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  // 文章数据
  let post: any = null;
  if (params && params?.slug) {
    post = await getPostBySlug(locale, params.first_dir, params.second_dir, params.slug);
  }

  return {
    props: {
      // 写上用到的翻译文件命名空间，否则翻译内容不会在服务端渲染。
      ...(await loadTranslations(ni18nConfig, locale, ['common'])),
      post,
    },
  };
};

const PostItem: FC<NextPage & IProps> = ({ post }) => {
  const { t: global } = useTranslation('common');

  return (
    <Layout>
      <MDXProvider>
        <PageHeader title={post.title}>
          <meta name='description' content={post.description} />
          <meta name='keywords' content={post.tags} />
        </PageHeader>

        <section className='prose max-w-none bg-white px-[5%] py-12 shadow shadow-gray-5'>
          <div className='space-y-2'>
            <h2 className='!my-0 text-3xl font-bold dark:text-white'>{post.title}</h2>
            <p className='text-base text-gray-5 hover:border-gray-7'>
              {global('updateTime')} {post.date}
            </p>
          </div>
          <article className='markdown-area'>
            <MDXRemote {...post.content} components={components} />
          </article>
        </section>
      </MDXProvider>
    </Layout>
  );
};

export default PostItem;
