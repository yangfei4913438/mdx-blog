import { FC, PropsWithChildren, useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, Search, AlignJustify } from 'lucide-react';
import { scrollToTop } from '@/utils/pageScroll';
import usePageScroll from '@/hooks/usePageScroll';
import Nav from '@/components/nav';
import Footer from '@/components/pages/footer';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetOverlay, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SeoLink from '@/components/link';
import { usePostData } from '@/store';
import TabbedContent from '@/components/tabbedContent';
import SearchDialog from '@/components/searchDialog';
import { useRouter } from 'next/router';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // 页面滚动百分比
  const percent = usePageScroll();
  // 获取博客数据
  const { tagKeys } = usePostData();
  // 获取路由信息
  const {
    query: { second_dir },
    pathname,
  } = useRouter();

  // 是否显示页脚
  const showFooter = useMemo(() => {
    return second_dir || ['/about', '/tags'].includes(pathname);
  }, [pathname, second_dir]);

  return (
    <div className='min-h-screen w-screen bg-secondary'>
      {percent === 0 ? (
        <span className='sticky top-0 z-40 h-1 w-screen bg-gray-800' />
      ) : (
        <Progress value={percent} className='sticky top-0 z-40 hidden h-1 w-screen bg-[#eee] lg:block' />
      )}

      <section className='min-w-xs top-0 z-0 px-4 xl:px-[8%] 2xl:px-[12%]'>
        <article className='flex w-full flex-col md:space-x-3 lg:flex-row'>
          <aside className='hidden grow-0 lg:block lg:w-[22%] lg:min-w-80'>
            <Nav />
            <TabbedContent>
              <div
                className='flex flex-none cursor-pointer items-center justify-center bg-[#eee] py-1 text-gray-5'
                onClick={scrollToTop}
              >
                <ArrowUp className='mr-0.5 h-4 w-4' />
                <p className='text-sm font-bold'>{percent}%</p>
              </div>
            </TabbedContent>
          </aside>

          <header className='sticky top-0 z-40 lg:hidden'>
            <div className='relative mb-2.5 flex items-center  justify-between space-y-2  bg-[#222] p-8 text-center text-white shadow shadow-gray-5'>
              <Sheet>
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
                      <SeoLink className='w-full' href='/' self>
                        首页
                      </SeoLink>
                    </Button>
                    <hr className='text-gray-5' />
                    <Button
                      variant='ghost'
                      className='relative w-full justify-start text-base text-gray-9 hover:bg-gray-1'
                    >
                      <SeoLink className='w-full' href='/tags' self>
                        标签
                      </SeoLink>
                      <div className='absolute right-8 rounded-xl bg-gray-3 px-1 py-1 text-xs text-gray-8'>
                        {tagKeys}
                      </div>
                    </Button>
                    <hr className='text-gray-5' />
                    <Button variant='ghost' className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}>
                      <SeoLink className='w-full' href='/about' self>
                        关于本站
                      </SeoLink>
                    </Button>
                  </div>

                  <div className='shadow shadow-gray-5'>
                    <TabbedContent />
                  </div>
                </SheetContent>
              </Sheet>
              <div>
                <div className='text-lg font-bold'>杨飞的博客</div>
                <div className='text-normal'>全是干货的技术博客</div>
              </div>
              <Button variant='ghost' className='hover:bg-transparent hover:text-gray-5'>
                <SearchDialog>
                  <Search className='h-5 w-5' />
                </SearchDialog>
              </Button>
            </div>
          </header>
          <main className='relative grow'>
            {children}
            {showFooter && <Footer />}
          </main>
        </article>
      </section>
    </div>
  );
};

export default Layout;
