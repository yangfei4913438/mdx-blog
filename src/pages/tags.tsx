import Layout from '@/components/pages/layout';
import type { GetStaticProps } from 'next';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';
import { usePostData } from '@/store/hooks';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { siteInfo } from '@/core/config';

const WordCloud = dynamic(() => import('@/components/Echarts/wordcloud'), { ssr: false });

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await loadTranslations(ni18nConfig, locale, ['common'])),
  },
});

const Tags = () => {
  // 获取博客数据
  const { wordcloud } = usePostData();
  const router = useRouter();

  return (
    <Layout pageName={'标签词云'} keywords={'标签,词云'} pageUrl={siteInfo.url + router.asPath}>
      <div className='w-full bg-white py-4 shadow shadow-gray-5'>
        <div className='text-center text-2xl font-bold'>标签词云</div>
        <WordCloud data={wordcloud} className='h-[500px]' />
      </div>
    </Layout>
  );
};

export default Tags;
