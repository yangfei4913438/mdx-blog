import Image from 'next/image';
import avator from '@/assets/avator.jpeg';
import SeoLink from '@/components/link';
import { ArrowUp, Github, Mail } from 'lucide-react';
import cc from '@/assets/cc-by-nc-sa.svg';
import { scrollToTop } from '@/utils/pageScroll';
import type { FC } from 'react';
import { usePostData } from '@/store/hooks';

interface IOverview {
  percent: number;
}

const Overview: FC<IOverview> = ({ percent }) => {
  // 获取博客数据
  const { tagKeys, logs } = usePostData();

  return (
    <div className='sticky top-3 mt-3 bg-white shadow shadow-gray-5'>
      <div className='flex flex-col text-center'>
        <div className='flex flex-1 flex-col justify-start'>
          <Image src={avator} alt={'头像'} className='-mb-16 -mt-12 scale-50 rounded-[50%]' />
          <div className='font-bold text-gray-8'>杨飞</div>
          <div className='text-sm text-gray-6'>记录一些前后端的开发技术</div>
          <ul className='grid grid-cols-2 divide-x divide-black-opacity-3 px-24 py-2 text-sm font-bold text-gray-6'>
            <li>
              <strong className='text-base font-semibold text-gray-9'>{logs}</strong>
              <p>日志</p>
            </li>
            <li>
              <strong className='text-base font-semibold text-gray-9'>{tagKeys}</strong>
              <p>标签</p>
            </li>
          </ul>
          <div className='grid grid-cols-2 px-12 text-gray-7'>
            <SeoLink
              className='mr-5 flex items-center justify-center text-lg font-normal'
              title='GitHub → https://github.com/yangfei4913438'
              href='https://github.com/yangfei4913438'
              self={false}
            >
              <Github className='mr-1 h-4 w-4' />
              <p className='text-normal font-bold'>Github</p>
            </SeoLink>
            <SeoLink
              href='mailto:yangfei86@vip.qq.com'
              title='E-Mail → mailto:yangfei86@vip.qq.com'
              self={false}
              className='flex items-center justify-center'
            >
              <Mail className='mr-1 h-4 w-4' />
              <p className='text-normal font-bold'>E-Mail</p>
            </SeoLink>
          </div>
          <div className='flex w-full justify-center pb-4 pt-2'>
            <SeoLink
              className='scale-125 border border-gray-2'
              href='https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.zh-hans'
              self={false}
            >
              <Image src={cc} alt={'by-nc-sa'} />
            </SeoLink>
          </div>
        </div>
        <div
          className='flex flex-none cursor-pointer items-center justify-center bg-[#eee] py-1 text-gray-5'
          onClick={scrollToTop}
        >
          <ArrowUp className='mr-0.5 h-4 w-4' />
          <p className='text-sm font-bold'>{percent}%</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
