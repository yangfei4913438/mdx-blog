import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SeoLink from '@/components/link';
import useNextLink from '@/hooks/useNextLink';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (props) => {
  return {
    props,
  };
};

const Custom404 = () => {
  const router = useRouter();
  const { handleLink } = useNextLink();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-3xl text-gray-9'>很抱歉! 您访问的页面不存在!</h1>
      <p className='mb-4 mt-8 text-base text-md text-gray-600'>正在为您自动跳转到首页，请稍后...</p>
      <SeoLink href='/' className='text-red-500' onClick={handleLink('/')}>
        点击立刻跳转
      </SeoLink>
    </div>
  );
};

export default Custom404;
