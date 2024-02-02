import { FC, PropsWithChildren, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '@/utils/pageScroll';
import usePageScroll from '@/hooks/usePageScroll';
import Overview from '@/components/overview';
import Nav from '@/components/nav';
import Footer from '@/components/pages/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DirTree from '@/components/dirTree';

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

      <section className='top-0 z-0 w-full px-4 lg:px-[12%] 2xl:px-[16%]'>
        <article className='flex w-full md:space-x-3'>
          <aside className='hidden grow-0 md:block md:w-[22%] md:min-w-72'>
            <Nav />

            <Tabs
              value={tab}
              onValueChange={setTab}
              className='sticky top-3 mt-3 bg-white pt-4 text-center shadow shadow-gray-5'
            >
              <TabsList>
                <TabsTrigger value='tree'>目录</TabsTrigger>
                <TabsTrigger value='info'>概览</TabsTrigger>
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
