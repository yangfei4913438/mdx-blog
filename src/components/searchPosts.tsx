import React, { type FC, useMemo } from 'react';
import { Home } from 'lucide-react';
import cls from 'classnames';
import { Virtuoso } from 'react-virtuoso';

import { usePostData } from '@/store';
import SeoLink from '@/components/link';
import useNextLink from '@/hooks/useNextLink';

interface IProps {
  userInput: string;
}

const SearchPosts: FC<IProps> = ({ userInput }) => {
  // 获取博客数据
  const { postInfos } = usePostData();
  // 响应链接
  const { handleLink } = useNextLink();

  const list = useMemo(() => {
    return userInput
      ? postInfos.filter((item) => {
          return (
            [
              String(item.dir).toLowerCase(),
              String(item.subDir).toLowerCase(),
              String(item.title).toLowerCase(),
              String(item.description).toLowerCase(),
              ...item.tags.map((k) => String(k).toLowerCase()),
            ].filter((key) => String(key).match(String(userInput).toLowerCase())).length > 0
          );
        })
      : postInfos;
  }, [userInput, postInfos]);

  // 文本高亮
  const Highlight = (text = '') => {
    // 前后去空格
    if (!userInput.trim()) {
      return <span>{text}</span>;
    }
    // 正则匹配
    const regex = new RegExp(`(${userInput})`, 'gi');
    // 分隔字符串
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className='text-red-500'>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <article className='bg-white py-0'>
      <Virtuoso
        style={{ height: 500 }}
        data={list}
        totalCount={list.length}
        itemContent={(idx, item) => {
          return (
            <div className='space-y-1 pb-2' key={idx}>
              <div className='flex items-center gap-2 text-base'>
                <div className='flex items-baseline'>
                  <div className='mr-1'>
                    <Home size='16px' className='-mb-[2px]' />
                  </div>
                  <div className='text-normal font-bold capitalize text-gray-8'>{Highlight(item.dir)}</div>
                  <div className='mx-1 text-gray-5'>/</div>
                  <div className='text-normal font-bold capitalize text-gray-8'>{Highlight(item.subDir)}</div>
                </div>
              </div>
              <SeoLink
                href={item.url}
                className={cls('inline-block w-full space-y-0.5 px-0 py-0')}
                onClick={handleLink(item.url, true)}
              >
                <div className='underline-animation text-md font-medium'>
                  {idx + 1}. {Highlight(item.title)}
                </div>
              </SeoLink>
              <div className='text-normal'>
                <span className='font-medium'>标签: </span>
                {Highlight(item.tags.join(', '))}
              </div>
              <div className='text-normal'>
                <span className='font-medium'>描述: </span>
                {Highlight(item.description)}
              </div>
              <hr className='!mt-3' />
            </div>
          );
        }}
      />
    </article>
  );
};

export default SearchPosts;
