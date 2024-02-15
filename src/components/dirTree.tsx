import { usePostData } from '@/store/hooks';
import { useMemo } from 'react';
import SeoLink from '@/components/link';
import { useRouter } from 'next/router';
import cls from 'classnames';

const DirTree = () => {
  // 获取博客数据
  const { postInfos } = usePostData();
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
                'py-2 pl-8 font-bold hover:cursor-pointer lg:py-1 ',
                isEqual(dir) ? 'bg-gray-1 text-primary' : 'bg-gray-3'
              )}
            >
              <SeoLink href={`/?key=${dir}`} self>
                <div className='w-full truncate capitalize'>{dir}</div>
              </SeoLink>
            </div>
            {subDirs
              .filter((item) => item.length)
              .map((sub) => {
                return (
                  <div
                    className={cls(
                      'py-2 pl-16 hover:cursor-pointer hover:bg-gray-1 lg:py-0.5',
                      isEqual(sub) ? 'bg-gray-1 text-primary' : ''
                    )}
                    key={sub}
                  >
                    <SeoLink href={`/?key=${sub}`} self>
                      <div className='w-full truncate capitalize'>{sub}</div>
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
