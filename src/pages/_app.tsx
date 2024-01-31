import '@/styles/index.scss';
import 'aos/dist/aos.css';
import type { AppProps } from 'next/app';
import { appWithI18Next } from 'ni18n';
import useLanguageInit from '@/hooks/useLanguageInit';
import { ni18nConfig } from '../../ni18n.config';
import { StoreProvider } from '@/store';
import { useEffect } from 'react';
import Aos from 'aos';
import InitData from '@/components/initData';

const App = ({ Component, pageProps }: AppProps) => {
  // 语言初始化
  useLanguageInit();

  // 滚动文字动画，初始化
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true, // 动画只显示一次
    });
  }, []);

  return (
    <StoreProvider>
      <InitData />
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default appWithI18Next(App, ni18nConfig);
