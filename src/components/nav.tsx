import type { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { Home, Search, Tags, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SeoLink from '@/components/link';
import SearchDialog from '@/components/searchDialog';
import { usePostData } from '@/store/hooks';
import useDialogData from '@/store/hooks/useDialogData';

const Nav = () => {
  // 获取博客数据
  const { tagKeys } = usePostData();
  // 控制开关
  const { setOpen } = useDialogData();
  // 获取路由信息
  const { push } = useRouter();

  // 响应 link 点击
  const handleLink: (pathname: string) => MouseEventHandler<HTMLAnchorElement> = (pathname: string) => (event) => {
    event.preventDefault();
    // 使用命令式路由编程，更好的交互体验
    return push({ pathname });
  };

  return (
    <div className='shadow shadow-gray-5' id='layout-nav'>
      <div className='-mt-1 flex flex-col items-center justify-center space-y-2 bg-[#222] py-6 text-center'>
        <div className='text-lg font-bold text-white'>杨飞的博客</div>
        <div className='text-normal text-white'>全是干货的技术博客</div>
      </div>
      <div className='flex w-full flex-col items-start bg-white px-4 py-4'>
        <Button variant='ghost' className='w-full justify-start text-base text-gray-9 hover:bg-gray-1'>
          <SeoLink
            className='mr-5 flex w-full items-center justify-start font-medium'
            href='/'
            onClick={handleLink('/')}
          >
            <Home className='mr-1 h-4 w-4' /> 首页
          </SeoLink>
        </Button>
        <Button variant='ghost' className='w-full justify-start text-base text-gray-9 hover:bg-gray-1'>
          <SeoLink
            className='mr-5 flex w-full items-center justify-start font-medium'
            href='/tags'
            onClick={handleLink('/tags')}
          >
            <Tags className='mr-1 h-4 w-4' /> 标签
          </SeoLink>
          <div className='rounded-xl bg-gray-3 px-1 py-1 text-xs text-gray-8'>{tagKeys}</div>
        </Button>
        <Button variant='ghost' className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}>
          <SeoLink
            className='mr-5 flex w-full items-center justify-start font-medium'
            href='/about'
            onClick={handleLink('/about')}
          >
            <User className='mr-1 h-4 w-4' /> 关于
          </SeoLink>
        </Button>
        <SearchDialog>
          <Button
            variant='ghost'
            className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}
            onClick={setOpen}
          >
            <div className='mr-5 flex w-full items-center justify-start font-medium'>
              <Search className='mr-1 h-4 w-4' />
              <span>搜索</span>
            </div>
          </Button>
        </SearchDialog>
      </div>
    </div>
  );
};

export default Nav;
