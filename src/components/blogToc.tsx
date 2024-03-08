import React, { useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { useContentData } from '@/store';
import SeoLink from '@/components/link';
import useNextLink from '@/hooks/useNextLink';

const BlogToc = () => {
  // 更新 mdx 内容
  const { content } = useContentData();
  // 响应链接
  const { handlePageScroll } = useNextLink();

  // 只渲染目录
  const OnlyTocComponents = useMemo(() => {
    const tags = Array.from(document.getElementsByTagName('*'))
      .filter((value, index, array) => array.indexOf(value) === index)
      .map((k) => k.tagName.toLowerCase());

    const obj: any = {};
    // 除了 nav, ol, li, a 这四个标签之外，其他标签都不渲染。
    const list = ['nav', 'ol', 'li', 'a'];
    tags.forEach((key) => {
      if (!list.includes(key)) {
        obj[key] = () => null;
      } else {
        if (key == 'a') {
          // 这里是为了兼容移动端，目录都是弹窗显示，点击后需要关闭弹窗。
          obj['a'] = (props: any) => (
            <SeoLink {...props} onClick={handlePageScroll(props.href, true)}>
              <div className='truncate text-base capitalize'>{props.children}</div>
            </SeoLink>
          );
        }
      }
    });
    return obj;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <div className='blog-toc'>
      <MDXRemote {...content} components={OnlyTocComponents} />
    </div>
  );
};

export default BlogToc;
