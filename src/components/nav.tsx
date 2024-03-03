import { Home, Search, Tags, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SeoLink from '@/components/link';
import SearchDialog from '@/components/searchDialog';
import { usePostData, useDialogData } from '@/store';
import useNextLink from '@/hooks/useNextLink';
import { siteInfo } from '@/core/config';

const Nav = () => {
  // 获取博客数据
  const { tagKeys } = usePostData();
  // 控制开关
  const { setOpen } = useDialogData();
  // 响应链接
  const { handleLink } = useNextLink();

  return (
    <div className='shadow shadow-gray-5' id='layout-nav'>
      <div className='-mt-1 flex flex-col items-center justify-center space-y-2 bg-[#222] py-6 text-center'>
        <div className='text-lg font-bold text-white'>{siteInfo.name}</div>
        <div className='text-normal text-white'>{siteInfo.desc}</div>
      </div>
      <div className='flex w-full flex-col items-start bg-white px-4 py-4'>
        <Button variant='ghost' className='w-full justify-start text-base text-gray-9 hover:bg-gray-1'>
          <SeoLink
            className='mr-5 flex w-full items-center justify-start font-medium'
            href='/'
            onClick={handleLink('/')}
          >
            <Home className='mr-1 h-4 w-4' /> {siteInfo.home}
          </SeoLink>
        </Button>
        <Button variant='ghost' className='w-full justify-start text-base text-gray-9 hover:bg-gray-1'>
          <SeoLink
            className='mr-5 flex w-full items-center justify-start font-medium'
            href='/tags'
            onClick={handleLink('/tags')}
          >
            <Tags className='mr-1 h-4 w-4' /> {siteInfo.tag}
          </SeoLink>
          <div className='rounded-xl bg-gray-3 px-1 py-1 text-xs text-gray-8'>{tagKeys}</div>
        </Button>
        <Button variant='ghost' className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}>
          <SeoLink
            className='mr-5 flex w-full items-center justify-start font-medium'
            href='/about'
            onClick={handleLink('/about')}
          >
            <User className='mr-1 h-4 w-4' /> {siteInfo.about}
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
              <span>{siteInfo.search}</span>
            </div>
          </Button>
        </SearchDialog>
      </div>
    </div>
  );
};

export default Nav;
