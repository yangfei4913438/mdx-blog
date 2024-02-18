import { usePostData } from '@/store';
import React, { FC, useMemo, useState } from 'react';
import SeoLink from '@/components/link';
import { Home } from 'lucide-react';

const SearchPosts: FC<{ userInput: string }> = ({ userInput }) => {
  // 获取博客数据
  const { postInfos } = usePostData();

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
    <article className='bg-white py-2'>
      {list.map((item, idx) => (
        <div className='space-y-1 pb-2 first:-mt-2' key={idx}>
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
            self
            className='inline-block w-full space-y-0.5 px-0 py-0 hover:underline hover:decoration-2 hover:underline-offset-4'
          >
            <div className='text-md font-medium'>{Highlight(item.title)}</div>
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
      ))}
    </article>
  );
};

export default SearchPosts;
