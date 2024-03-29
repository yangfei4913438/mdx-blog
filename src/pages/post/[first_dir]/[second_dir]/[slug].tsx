import 'prism-themes/themes/prism-xonokai.min.css';
import { MDXProvider } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote';
import { getPostBySlug, getPostSlugList } from '@/core/api';
import { GetStaticProps, NextPage } from 'next';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../../../../ni18n.config';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { components } from '@/components/markdown';
import Layout from '@/components/pages/layout';
import SeoLink from '@/components/link';
import { Home } from 'lucide-react';
import useNextLink from '@/hooks/useNextLink';
import { useContentData } from '@/store';
import { siteInfo } from '@/core/config';

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
      const filename = post.split('.md')[0];
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
  timestamp: string;
  url: string;
  tags: any;
  slug: any;
  content: any;
}

interface IProps {
  post: IPost;
  first_dir: string;
  second_dir: string;
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
      first_dir: params?.first_dir ?? '',
      second_dir: params?.second_dir ?? '',
      post,
    },
  };
};

const PostItem: FC<NextPage & IProps> = ({ post, first_dir, second_dir }) => {
  const { t: global } = useTranslation('common');
  // 响应链接
  const { handleLinkWithQueryKey } = useNextLink();
  // 更新 mdx 内容
  const { setContent } = useContentData();

  useEffect(() => {
    // 文章正文更新的时候，更新正文.
    setContent(post.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.content]);

  return (
    <Layout
      time={post.timestamp}
      pageName={post.title}
      pageDesc={post.description}
      keywords={post.tags}
      pageUrl={siteInfo.url + post.url}
    >
      <MDXProvider>
        <section className='prose max-w-none bg-white px-[5%] py-12 shadow shadow-gray-5'>
          <div className='space-y-0'>
            <div className='flex items-center gap-2 text-base'>
              <div className='flex items-baseline'>
                <div className='mr-1'>
                  <Home size='20px' className='-mb-[2px]' />
                </div>
                <SeoLink
                  href={`/?key=${first_dir}`}
                  className='text-base font-bold capitalize text-gray-8'
                  onClick={handleLinkWithQueryKey('/', first_dir)}
                >
                  {first_dir}
                </SeoLink>
                <div className='mx-1 text-gray-5'>/</div>
                <SeoLink
                  href={`/?key=${second_dir}`}
                  className='text-base font-bold capitalize text-gray-8'
                  onClick={handleLinkWithQueryKey('/', second_dir)}
                >
                  {second_dir}
                </SeoLink>
              </div>
            </div>
            <h2 className='!my-0 !mt-2 border-t border-t-gray-3 pt-2 text-3xl font-bold dark:text-white'>
              {post.title}
            </h2>
          </div>
          <article className='markdown-area [&>.toc]:hidden'>
            <MDXRemote {...post.content} components={components} />
          </article>
          <hr className='mb-4 mt-8 text-gray-5' />
          <p className='border-gray-7'>
            {global('updateTime')} {post.date}
          </p>
        </section>
      </MDXProvider>
    </Layout>
  );
};

export default PostItem;
