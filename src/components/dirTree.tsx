import { usePostData } from '@/store/hooks';
import { useMemo } from 'react';
import SeoLink from '@/components/link';

const DirTree = () => {
  // 获取博客数据
  const { postInfos } = usePostData();

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

  return (
    <div className='text-left'>
      {Object.entries(dirs).map(([dir, subDirs], idx) => {
        return (
          <div className={''} key={idx}>
            <div className={'bg-gray-3 py-1 pl-8 font-bold hover:cursor-pointer '}>
              <SeoLink href={`/?key=${dir}`} self>
                <div className='w-full truncate'>{dir}</div>
              </SeoLink>
            </div>
            {subDirs
              .filter((item) => item.length)
              .map((sub) => {
                return (
                  <div className='py-0.5 pl-16 hover:cursor-pointer hover:bg-gray-1' key={sub}>
                    <SeoLink href={`/?key=${sub}`} self>
                      <div className='w-full truncate'>{sub}</div>
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
