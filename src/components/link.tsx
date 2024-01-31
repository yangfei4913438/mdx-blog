import React, { FC, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  // 超链接
  href: string;
  // 自定义类名
  className?: string;
  // 是否当前页打开，默认当前页面打开
  self?: boolean;
  // title属性(seo权重1份)
  title?: string;
}

// 封装 a 标签
const SeoLink: FC<IProps> = ({ href, className, self = true, title = '', children }) => {
  return (
    <a
      className={className}
      href={href}
      title={title}
      target={self ? '_self' : '_blank'}
      rel='noopener external nofollow noreferrer'
    >
      {children}
    </a>
  );
};

export default SeoLink;
