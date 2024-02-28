import { usePostData } from '@/store/hooks';
import { useMemo } from 'react';
import SeoLink from '@/components/link';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { BookMarked } from 'lucide-react';

const DirTree = () => {
  // 获取博客数据
  const { postInfos, tags } = usePostData();
  // 获取路由信息
  const { query } = useRouter();

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
    const source = String(query?.key ?? query?.second_dir ?? '').toLowerCase();
    const target = String(name).toLowerCase();
    return source === target;
  };

  return (
    <div className='text-left'>
      {Object.entries(dirs).map(([dir, subDirs], idx) => {
        return (
          <div className={''} key={idx}>
            <div
              className={cls(
                'flex items-center py-2 pl-2 pr-8 font-bold hover:cursor-pointer lg:py-1 ',
                isEqual(dir) ? 'bg-gray-1 font-bold' : 'bg-gray-3'
              )}
            >
              {isEqual(dir) ? <BookMarked className='mt-0.5 h-3.5 w-6 min-w-6' /> : <div className='min-w-6' />}
              <SeoLink href={`/?key=${dir}`} className='flex flex-1 items-center justify-between' self>
                <div className='truncate capitalize'>{dir}</div>
                <div className='min-w-3.5'>({tags[dir]})</div>
              </SeoLink>
            </div>
            {subDirs
              .filter((item) => item.length)
              .map((sub) => {
                return (
                  <div
                    className={cls(
                      'flex items-center py-2 pl-6 pr-8 hover:cursor-pointer hover:bg-gray-1 lg:py-0.5',
                      isEqual(sub) ? 'bg-gray-1 font-bold' : ''
                    )}
                    key={sub}
                  >
                    {isEqual(sub) ? <BookMarked className='mt-0.5 h-3.5 w-6 min-w-6' /> : <div className='min-w-6' />}
                    <SeoLink href={`/?key=${sub}`} className='flex flex-1 items-center justify-between' self>
                      <div className='truncate capitalize'>{sub}</div>
                      <div className='min-w-3.5'>({tags[sub]})</div>
                    </SeoLink>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default DirTree;
