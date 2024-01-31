import React, { DOMElement } from 'react';
import NextLink from '../link';
import MDVideo from './video';
import MDImage from './image';
import dynamic from 'next/dynamic';

// 因为是客户端适配的组件，所以不能在服务器端渲染
const MDPre = dynamic(() => import('./pre'), { ssr: false });

// 导出自定义渲染标签
export const components = {
  nextLink: (props: {
    // 超链接
    href: string;
    // 自定义类名
    className?: string;
    // 是否当前页打开，默认当前页面打开
    self?: boolean;
    // title属性(seo权重1份)
    title?: string;
  }) => {
    return <NextLink {...props} />;
  },
  pre: (props: { className: string; children: DOMElement<any, any> }) => {
    return <MDPre className={props.className}>{props.children}</MDPre>;
  },
  Video: (props: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>) => {
    return <MDVideo {...props} />;
  },
  Image: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    return <MDImage {...props} />;
  },
};
