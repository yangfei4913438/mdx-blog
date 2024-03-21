import { useLayoutEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { BookMarked } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import SeoLink from '@/components/link';
import useNextLink from '@/hooks/useNextLink';
import { usePostData } from '@/store/hooks';

const DirTree = () => {
  // 获取博客数据
  const { postInfos, tags, valueKeyMap, firstDirs } = usePostData();
  // 获取路由信息
  const {
    query: { key, first_dir, second_dir },
  } = useRouter();
  // 展开的一级目录key
  const [value, setValue] = useState<string>('');
  // 响应链接
  const { handleLinkWithQueryKey } = useNextLink();

  // 在页面渲染之前完成逻辑处理
  useLayoutEffect(() => {
    // 有值表示当前是切换渲染，不需要重新设置。
    if (value) return;
    // 如果是文章列表的情况
    if (key) {
      const target = valueKeyMap[String(key).toLowerCase()];
      if (target) {
        setValue(target);
        return;
      }
    }
    // 如果是正文的情况
    if (first_dir) {
      setValue(first_dir as string);
      return;
    }
  }, [first_dir, key, value, valueKeyMap]);

  const dirs = useMemo(() => {
    // 声明空对象
    const obj: { [key: string]: string[] } = {};
    // 遍历处理
    postInfos.forEach((item) => {
      const firstDir = item.dir;
      const secondDir = item.subDir;
      // 判断是否已经添加
      if (Object.keys(obj).includes(firstDir)) {
        // 判断二级目录是否已经添加
        if (!obj[firstDir].includes(secondDir)) {
          // 没有的就直接增加
          obj[firstDir].push(secondDir);
        }
      } else {
        // 没添加的，直接创建新属性
        obj[firstDir] = [secondDir];
      }
    });
    // 返回对象
    return obj;
  }, [postInfos]);

  const isEqual = (name: string) => {
    // 文章界面不存在 key属性，目录界面不存在 second_dir 属性
    const source = String(key ?? second_dir ?? '').toLowerCase();
    const target = String(name).toLowerCase();
    return source === target;
  };

  return (
    <Accordion type={'single'} className='border-t' collapsible value={value}>
      {Object.entries(dirs).map(([dir, subDirs], idx) => {
        return (
          <AccordionItem value={dir} key={idx}>
            <AccordionTrigger
              className='flex items-center bg-gray-3 py-2 pl-8 pr-8 font-bold hover:cursor-pointer lg:py-1'
              onClick={() => setValue(dir)}
            >
              <div className='flex flex-1 items-center justify-between'>
                <div className='truncate capitalize'>{dir}</div>
                <div className='min-w-3.5'>({tags[dir]})</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {subDirs
                .filter((item) => item.length)
                .map((sub) => {
                  return (
                    <div
                      className={cls(
                        'flex items-center py-2 pl-6 pr-8 text-normal first:border-t hover:cursor-pointer hover:bg-gray-1 lg:py-1'
                      )}
                      key={sub}
                    >
                      {isEqual(sub) ? <BookMarked className='mt-0.5 h-3.5 w-6 min-w-6' /> : <div className='min-w-6' />}
                      <SeoLink
                        href={`/?key=${sub}`} // 这里是为了 seo 优化设置的，其实跳转不用这个
                        className='flex flex-1 items-center justify-between'
                        onClick={handleLinkWithQueryKey('/', sub, true)}
                      >
                        <div className='truncate text-base capitalize'>{sub}</div>
                        <div className='min-w-3.5'>({tags[sub]})</div>
                      </SeoLink>
                    </div>
                  );
                })}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default DirTree;
