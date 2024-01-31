import type { FC, PropsWithChildren } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import SeoLink from '@/components/link';
import { ArrowUp, Github, Home as HomeIcon, Mail, Search, Tags, User } from 'lucide-react';
import Image from 'next/image';
import avator from '@/assets/avator.jpeg';
import cc from '@/assets/cc-by-nc-sa.svg';
import { scrollToTop } from '@/utils/pageScroll';
import usePageScroll from '@/hooks/usePageScroll';
import Overview from '@/components/overview';
import Nav from '@/components/nav';
import Footer from '@/components/pages/footer';

interface ILayout extends PropsWithChildren {}

const Layout: FC<ILayout> = ({ children }) => {
  const percent = usePageScroll();

  return (
    <div className='min-h-screen w-screen bg-[#eee]'>
      {percent === 0 ? (
        <span className='bg-gray-800 sticky top-0 z-40 h-1 w-screen' />
      ) : (
        <Progress value={percent} className='sticky top-0 z-40 h-1 w-screen bg-[#eee]' />
      )}

      <section className='top-0 z-0 w-full px-[15%]'>
        <article className='flex w-full space-x-3'>
          <aside className='w-72 min-w-72 grow-0'>
            <Nav />
            <Overview percent={percent} />
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
