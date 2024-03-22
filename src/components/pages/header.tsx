import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { siteInfo } from '@/core/config';
import dayjs from 'dayjs';

interface IHeader extends PropsWithChildren {
  // 符合 ISO 8601 时间标准的时间戳
  time?: string;
  // 页面关键字
  keywords?: string;
  // 页面标题
  pageName: string;
  // 页面完整url
  pageUrl?: string;
  // 页面描述
  pageDesc?: string;
}

const Header: FC<IHeader> = ({ time, keywords, pageUrl, pageName, pageDesc, children }) => {
  return (
    <Head>
      <title>{pageName}</title>
      <meta name='apple-mobile-web-app-title' content={pageName} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='content-language' content='en,cn' />

      <meta name='application-name' content={siteInfo.name} />
      <meta name='description' content={pageDesc ?? siteInfo.desc} />
      <meta name='keywords' content={keywords + ',' + siteInfo.keywords} />

      {/* 如果页面信息不存在，就使用站点信息  */}
      <meta itemProp='name' content={pageName ?? siteInfo.name} />
      <meta itemProp='url' content={pageUrl ?? siteInfo.url} />
      {/* seo 搜索引擎优先访问，避免历史收录的 url，导致访问异常 */}
      <link rel='canonical' href={pageUrl ?? siteInfo.url} />

      {/* Open Graph 协议配置 */}
      <meta property='og:locale' content='zh_CN' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={siteInfo.name} />
      <meta property='og:title' content={pageName ?? siteInfo.name} />
      <meta property='og:description' content={pageDesc ?? siteInfo.desc} />
      <meta property='og:url' content={pageUrl ?? siteInfo.url} />
      {/* 内容修改时间，符合 ISO 8601 时间标准的时间戳 */}
      <meta property='article:modified_time' content={time ?? dayjs().toISOString()} />

      {/* 其他的页面头部代码 */}
      {children}
    </Head>
  );
};

export default Header;
