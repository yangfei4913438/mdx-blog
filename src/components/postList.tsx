import { usePostData } from '@/store';
import { useRouter } from 'next/router';
import cls from 'classnames';
import SeoLink from '@/components/link';
import { BookMarked } from 'lucide-react';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// 二级目录下的标题列表，用于快速切换二级目录下的文章
const PostList = () => {
  // 获取博客数据
  const { postInfos } = usePostData();

  const {
    query: { slug, second_dir },
  } = useRouter();

  const list = useMemo(() => {
    return second_dir
      ? postInfos.filter((item) => {
          return [String(item.dir).toLowerCase(), String(item.subDir).toLowerCase()].includes(
            String(second_dir).toLowerCase()
          );
        })
      : postInfos;
  }, [second_dir, postInfos]);

  const isCurrent = (target: string) => {
    return slug === target.split('/')[2];
  };

  return (
    <div className='flex max-h-[1000px] w-full flex-col overflow-auto text-left'>
      {list?.map((val, idx) => {
        return (
          <TooltipProvider key={idx} delayDuration={1000}>
            <Tooltip>
              <TooltipTrigger>
                <SeoLink href={val.url} self className='flex w-full items-center py-2 pl-2 pr-4 lg:py-1'>
                  {isCurrent(val.slug) ? <BookMarked className='mt-0.5 h-3.5 w-3.5' /> : <div className='min-w-3.5' />}
                  <span className={cls('ml-1 truncate', isCurrent(val.slug) && 'font-bold')}>
                    {idx + 1}. {val.title}
                  </span>
                </SeoLink>
              </TooltipTrigger>
              <TooltipContent side={'top'} align={'start'}>
                <span className='text-base'>{val.title}</span>
              </TooltipContent>
            </Tooltip>
            <hr className='ml-6 mr-4' />
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default PostList;
