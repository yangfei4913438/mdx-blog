import 'prism-themes/themes/prism-xonokai.min.css';
import { MDXProvider } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote';
import { getSideBarInfos, getPostBySlug, getPostSlugList } from '@/core/api';
import { GetStaticProps, NextPage } from 'next';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../../ni18n.config';
import PageHeader from '@/components/pages/header';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { components } from '@/components/markdown';
import Layout from '@/components/pages/layout';

interface Path {
  params: { slug: string };
  locale: string;
}
// 生成静态路由表
export const getStaticPaths = async (props: { locales: string[] }) => {
  const paths: Path[] = [];
  const { locales } = props;
  locales.forEach((locale) => {
    const posts = getPostSlugList();
    posts.forEach((post) => {
      paths.push({ params: { slug: post.split('.')[0] }, locale });
    });
  });
  console.log('paths:', paths);
  return {
    paths,
    fallback: false,
  };
};

interface IPost {
  dirIndex: number;
  subDirIndex: number;
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
  sideBarInfos: ISideBar[];
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  // 文章数据
  let post: any = undefined;
  if (params && params?.slug) {
    post = await getPostBySlug(locale, params.slug);
  }

  // 侧边栏数据
  const sideBarInfos = getSideBarInfos(locale);
  return {
    props: {
      // 写上用到的翻译文件命名空间，否则翻译内容不会在服务端渲染。
      ...(await loadTranslations(ni18nConfig, locale, ['common'])),
      post,
      // 整理数据，生成侧边栏需要的二维数组
      sideBarInfos,
    },
  };
};

const PostItem: FC<NextPage & IProps> = ({ post, sideBarInfos }) => {
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
