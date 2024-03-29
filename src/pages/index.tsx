import { useMemo } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { loadTranslations } from 'ni18n';
import { useTranslation } from 'react-i18next';
import { ni18nConfig } from '../../ni18n.config';
import { Virtuoso } from 'react-virtuoso';

import Layout from '@/components/pages/layout';
import Card from '@/components/card';
import SeoLink from '@/components/link';
import { usePostData } from '@/store/hooks';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/pages/footer';
import useNextLink from '@/hooks/useNextLink';
import { siteInfo } from '@/core/config';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await loadTranslations(ni18nConfig, locale, ['common'])),
  },
});

// 首页文章列表
const Home = () => {
  const { t: global } = useTranslation('common');
  // 获取博客数据
  const { postInfos } = usePostData();
  // 响应链接
  const { handleLink } = useNextLink();

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
    <Layout pageName={siteInfo.name}>
      <Virtuoso
        useWindowScroll
        data={list}
        className='mt-20'
        totalCount={list.length}
        components={{
          Header: () => {
            return <div className='-mt-20' />;
          },
          Footer: () => {
            return (
              <div className='-mt-3'>
                <Footer />
              </div>
            );
          },
        }}
        itemContent={(idx, item) => {
          return (
            <Card key={idx}>
              <div className='flex flex-col text-center'>
                <SeoLink className='inline-block w-full' href={item.url} onClick={handleLink(item.url)}>
                  <div className='underline-animation text-xl'>{item.title}</div>
                </SeoLink>
                <div className='text-normal font-normal'>
                  {global('updateTime')} {item.date} | 标签:{' '}
                  {item.tags.map((v) => (
                    <Badge variant='outline' className='mr-1 cursor-default' key={v}>
                      {v}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className='text-base font-normal'>{item.description}</div>
            </Card>
          );
        }}
      />
    </Layout>
  );
};

export default Home;
