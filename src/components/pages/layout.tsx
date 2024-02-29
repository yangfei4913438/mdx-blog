import { type FC, type PropsWithChildren, useMemo, useState } from 'react';
import { ArrowUp, Search, AlignJustify } from 'lucide-react';
import { useRouter } from 'next/router';
import throttle from 'lodash-es/throttle';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetOverlay, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { scrollToTop } from '@/utils/pageScroll';

import { usePostData, useDialogData, useSheetData } from '@/store';
import usePageScroll from '@/hooks/usePageScroll';

import Nav from '@/components/nav';
import Footer from '@/components/pages/footer';
import SeoLink from '@/components/link';
import TabbedContent from '@/components/tabbedContent';
import SearchDialog from '@/components/searchDialog';
import useNextLink from '@/hooks/useNextLink';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // 页面滚动百分比
  const percent = usePageScroll();
  // 获取博客数据
  const { tagKeys } = usePostData();
  // 响应链接
  const { handleLink } = useNextLink();
  // 控制开关
  const { setOpen } = useDialogData();
  // 侧边弹出
  const { visible, customVisible } = useSheetData();
  // 获取路由信息
  const {
    query: { second_dir },
    pathname,
  } = useRouter();
  // nav宽度
  const [navWidth, setNavWidth] = useState(0);

  // 是否显示页脚
  const showFooter = useMemo(() => {
    return second_dir || ['/about', '/tags'].includes(pathname);
  }, [pathname, second_dir]);

  // 监听宽度变化，获取目标宽度
  const handleResize = throttle(() => {
    const width = document.getElementById('layout-nav')!.getBoundingClientRect().width;
    setNavWidth(width);
  }, 10);

  return (
    <div className='min-h-screen w-screen bg-secondary'>
      {percent === 0 ? (
        <span className='sticky top-0 z-40 h-1 w-screen bg-gray-800' />
      ) : (
        <Progress value={percent} className='sticky top-0 z-40 hidden h-1 w-screen bg-[#eee] lg:block' />
      )}

      <section className='z-0 min-w-xs px-4 xl:px-[8%] 2xl:px-[12%]'>
        {/* 窄屏幕顶部 */}
        <header className='sticky top-0 z-40 lg:hidden'>
          <div className='relative mb-2.5 flex items-center justify-between space-y-2 bg-[#222] p-8 text-center text-white shadow shadow-gray-5'>
            <Sheet open={visible} onOpenChange={customVisible}>
              <SheetTrigger>
                <AlignJustify />
              </SheetTrigger>
              <SheetOverlay>
                <div className='bg-black-opacity-7 absolute -top-2 bottom-0 left-0 right-0' />
              </SheetOverlay>
              <SheetContent side='left' className='overflow-scroll border-none bg-white shadow shadow-gray-5'>
                <SheetTitle>博客导航</SheetTitle>
                <div className='my-4 shadow shadow-gray-5'>
                  <Button variant='ghost' className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}>
                    <SeoLink className='w-full' href='/' onClick={handleLink('/', true)}>
                      首页
                    </SeoLink>
                  </Button>
                  <hr className='text-gray-5' />
                  <Button
                    variant='ghost'
                    className='relative w-full justify-start text-base text-gray-9 hover:bg-gray-1'
                  >
                    <SeoLink className='w-full' href='/tags' onClick={handleLink('/tags', true)}>
                      标签
                    </SeoLink>
                    <div className='absolute right-8 rounded-xl bg-gray-3 px-1 py-1 text-xs text-gray-8'>{tagKeys}</div>
                  </Button>
                  <hr className='text-gray-5' />
                  <Button variant='ghost' className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}>
                    <SeoLink className='w-full' href='/about' onClick={handleLink('/about', true)}>
                      关于本站
                    </SeoLink>
                  </Button>
                </div>

                <div className='shadow shadow-gray-5'>
                  <TabbedContent width={navWidth} />
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <div className='text-lg font-bold'>杨飞的博客</div>
              <div className='text-normal'>全是干货的技术博客</div>
            </div>
            <SearchDialog>
              <Button variant='ghost' className='hover:bg-transparent hover:text-gray-5' onClick={setOpen}>
                <Search className='h-5 w-5' />
              </Button>
            </SearchDialog>
          </div>
        </header>

        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel
            tabIndex={0} // 这个属性，应该是ResizablePanel的索引值，不加上，控制台会有异常错误信息。
            defaultSize={25} // 这里的size数值，是百分比的值
            minSize={23} // 这里的size数值，是百分比的值
            onResize={handleResize}
            className='relative hidden lg:block'
          >
            <Nav />
            <TabbedContent width={navWidth}>
              <div
                className='flex flex-none cursor-pointer items-center justify-center bg-[#eee] py-1 text-gray-5'
                onClick={scrollToTop}
              >
                <ArrowUp className='mr-0.5 h-4 w-4' />
                <p className='text-sm font-bold'>{percent}%</p>
              </div>
            </TabbedContent>
          </ResizablePanel>

          <ResizableHandle className='mx-1.5 hidden bg-transparent lg:block' />

          <ResizablePanel tabIndex={1} defaultSize={75} minSize={60} onResize={handleResize}>
            {children}
            {showFooter && <Footer />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </div>
  );
};

export default Layout;
