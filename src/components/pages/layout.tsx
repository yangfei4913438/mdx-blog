import { FC, PropsWithChildren, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, Search, AlignJustify } from 'lucide-react';
import { scrollToTop } from '@/utils/pageScroll';
import usePageScroll from '@/hooks/usePageScroll';
import Overview from '@/components/overview';
import Nav from '@/components/nav';
import Footer from '@/components/pages/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DirTree from '@/components/dirTree';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetOverlay, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SeoLink from '@/components/link';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const percent = usePageScroll();
  const [tab, setTab] = useState('tree');

  return (
    <div className='min-h-screen w-screen bg-[#eee]'>
      {percent === 0 ? (
        <span className='bg-gray-800 sticky top-0 z-40 h-1 w-screen' />
      ) : (
        <Progress value={percent} className='sticky top-0 z-40 h-1 w-screen bg-[#eee]' />
      )}

      <section className='top-0 z-0 w-full px-4 xl:px-[12%] 2xl:px-[16%]'>
        <article className='flex w-full flex-col md:space-x-3 lg:flex-row'>
          <aside className='hidden grow-0 lg:block lg:w-[22%] lg:min-w-72'>
            <Nav />

            <Tabs
              value={tab}
              onValueChange={setTab}
              className='sticky top-3 mt-3 bg-white pt-4 text-center shadow shadow-gray-5'
            >
              <TabsList>
                <TabsTrigger className='text-base' value='tree'>
                  目录
                </TabsTrigger>
                <TabsTrigger className='text-base' value='info'>
                  概览
                </TabsTrigger>
              </TabsList>
              <TabsContent className='' value='tree'>
                <DirTree />
              </TabsContent>
              <TabsContent value='info'>
                <Overview percent={percent} />
              </TabsContent>

              <div
                className='flex flex-none cursor-pointer items-center justify-center bg-[#eee] py-1 text-gray-5'
                onClick={scrollToTop}
              >
                <ArrowUp className='mr-0.5 h-4 w-4' />
                <p className='text-sm font-bold'>{percent}%</p>
              </div>
            </Tabs>
          </aside>

          <header className='lg:hidden'>
            <div className='relative mb-2.5 flex items-center  justify-between space-y-2  bg-[#222] p-8 text-center text-white shadow shadow-gray-5'>
              <Sheet>
                <SheetTrigger>
                  <AlignJustify />
                </SheetTrigger>
                <SheetOverlay>
                  <div className='absolute -top-2 bottom-0 left-0 right-0 bg-black-opacity-7' />
                </SheetOverlay>
                <SheetContent side='left' className='border-none bg-white shadow shadow-gray-5'>
                  <SheetTitle>博客导航</SheetTitle>
                  <div className='my-4 shadow shadow-gray-5'>
                    <Button variant='ghost' className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}>
                      <SeoLink className='w-full' href='/' self>
                        首页
                      </SeoLink>
                    </Button>
                    <hr className='text-gray-5' />
                    <Button variant='ghost' className={'w-full justify-start text-base text-gray-9 hover:bg-gray-1'}>
                      <SeoLink className='w-full' href='/about' self>
                        关于本站
                      </SeoLink>
                    </Button>
                  </div>

                  <div className='shadow shadow-gray-5'>
                    <DirTree />
                  </div>
                </SheetContent>
              </Sheet>
              <div>
                <div className='text-[22px] font-bold'>杨飞的博客</div>
                <div className='text-sm'>全是干货的技术博客</div>
              </div>
              <Button variant='ghost'>
                <Search size='20px' />
              </Button>
            </div>
          </header>
          <main className='relative grow space-y-3'>
            {children}
            <Footer />
          </main>
        </article>
      </section>
    </div>
  );
};

export default Layout;
