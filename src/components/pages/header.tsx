import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { FC, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  title: string;
}

const Header: FC<IProps> = ({ title, children }) => {
  // 多语言
  const { t } = useTranslation('common');

  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='content-language' content='en,cn' />
      <meta name='theme-color' content='#ffffff' />

      {/* 其他的页面头部代码 */}
      {children}
    </Head>
  );
};

export default Header;
