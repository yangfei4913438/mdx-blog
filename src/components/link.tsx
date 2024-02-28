import type { FC, PropsWithChildren, DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

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

interface LinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

// 封装 a 标签
const SeoLink: FC<IProps & LinkProps> = ({ href, className, self = true, title = '', children, ...rest }) => {
  return (
    <a
      className={className}
      href={href}
      title={title}
      target={self ? '_self' : '_blank'}
      rel='noopener external nofollow noreferrer'
      {...rest}
    >
      {children}
    </a>
  );
};

export default SeoLink;
