import { ChangeEvent, useEffect, useMemo } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { loadTranslations } from 'ni18n';
import { useTranslation } from 'react-i18next';
import { ni18nConfig } from '../../ni18n.config';

import Layout from '@/components/pages/layout';
import Card from '@/components/card';
import SeoLink from '@/components/link';
import { usePostData } from '@/store/hooks';
import { Badge } from '@/components/ui/badge';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await loadTranslations(ni18nConfig, locale, ['common'])),
  },
});

// 首页文章列表
const Home = () => {
  // 获取博客数据
  const { postInfos } = usePostData();

  const {
    query: { key },
  } = useRouter();

  const list = useMemo(() => {
    return key
      ? postInfos.filter((item) => {
          return [String(item.dir).toLowerCase(), String(item.subDir).toLowerCase()].includes(
            String(key).toLowerCase()
          );
        })
      : postInfos;
  }, [key, postInfos]);

  return (
    <Layout>
      {list?.map((val, idx) => {
        return (
          <Card key={idx}>
            <div className='flex flex-col py-4 text-center'>
              <SeoLink className='inline-block w-full' href={val.url}>
                <div className='underline-animation text-2xl'>{val.title}</div>
              </SeoLink>
              <div className='text-normal font-normal'>
                发表时间: {val.date} | 标签:{' '}
                {val.tags.map((v) => (
                  <Badge variant='outline' className='mr-1 cursor-default' key={v}>
                    {v}
                  </Badge>
                ))}
              </div>
            </div>
            <div className='text-base font-normal'>{val.description}</div>
          </Card>
        );
      })}
    </Layout>
  );
};

export default Home;
