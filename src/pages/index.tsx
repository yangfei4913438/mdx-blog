import { ChangeEvent, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { loadTranslations } from 'ni18n';
import { useTranslation } from 'react-i18next';
import { ni18nConfig } from '../../ni18n.config';

import Layout from '@/components/pages/layout';
import Card from '@/components/card';
import SeoLink from '@/components/link';
import { usePostData } from '@/store/hooks';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await loadTranslations(ni18nConfig, locale, ['common'])),
  },
});

// 首页文章列表
const Home = () => {
  // 获取博客数据
  const { postInfos } = usePostData();

  return (
    <Layout>
      {postInfos?.map((val, idx) => {
        return (
          <Card key={idx}>
            <div className='flex flex-col items-center py-4'>
              <div className='text-2xl'>{val.title}</div>
              <div>
                发表时间: {val.date} | 标签: {val.tags.join(', ')}
              </div>
            </div>
            <div className=' space-y-4 px-8'>
              <div>{val.description}</div>
              <div className='text-center'>
                <SeoLink
                  href={val.url}
                  self
                  className='rounded px-4 py-2 outline outline-1 hover:shadow-md hover:shadow-gray-5'
                >
                  查看更多
                </SeoLink>
              </div>
            </div>
          </Card>
        );
      })}
    </Layout>
  );
};

export default Home;
