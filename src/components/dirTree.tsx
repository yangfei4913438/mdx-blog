import { usePostData } from '@/store/hooks';
import { useLayoutEffect, useMemo, useState } from 'react';
import SeoLink from '@/components/link';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { BookMarked } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const DirTree = () => {
  // 获取博客数据
  const { postInfos, tags, valueKeyMap } = usePostData();
  // 获取路由信息
  const {
    query: { key, first_dir, second_dir },
  } = useRouter();
  // 默认展开的一级目录
  const [value, setValue] = useState<string>();

  useLayoutEffect(() => {
    // 有值表示当前是切换渲染，不需要重新设置。
    if (value) return;
    if (first_dir) {
      setValue(first_dir as string);
    } else if (key) {
      const target = valueKeyMap[key as string];
      target && setValue(target);
    }
  }, [key, first_dir, valueKeyMap, setValue, value]);

  const dirs = useMemo(() => {
    const obj: { [key: string]: string[] } = {};
    postInfos.forEach((item) => {
      if (Object.keys(obj).includes(item.dir)) {
        if (!obj[item.dir].includes(item.subDir)) {
          obj[item.dir].push(item.subDir);
        }
      } else {
        obj[item.dir] = [item.subDir];
      }
    });
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
              className={cls('flex items-center bg-gray-3 py-2 pl-2 pr-8 font-bold hover:cursor-pointer lg:py-1')}
              onClick={() => setValue(dir)}
            >
              {isEqual(dir) ? <BookMarked className='mt-0.5 h-3.5 w-6 min-w-6' /> : <div className='min-w-6' />}
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
                      <SeoLink href={`/?key=${sub}`} className='flex flex-1 items-center justify-between' self>
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
