import Layout from '@/components/pages/layout';
import type { GetStaticProps } from 'next';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';
import usePostListData from '@/hooks/usePostListData';
import { useState } from 'react';
import { usePostData } from '@/store/hooks';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await loadTranslations(ni18nConfig, locale, ['common'])),
  },
});

const Tags = () => {
  // 获取博客数据
  const { tags } = usePostData();

  return (
    <Layout>
      <div className='min-h-full w-full space-y-8 bg-white px-8 py-4 shadow shadow-gray-5'>
        <div className='text-center text-2xl font-bold'>标签统计</div>
        <div className='flex flex-wrap gap-4'>
          {tags &&
            Object.entries(tags).map(([k, v]) => {
              return (
                <div key={k} className='text-xl'>
                  {k}({v as number})
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Tags;
