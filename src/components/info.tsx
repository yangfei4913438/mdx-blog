import Image from 'next/image';
import avator from '@/assets/avator.jpeg';
import SeoLink from '@/components/link';
import { Github, Mail } from 'lucide-react';
import cc from '@/assets/cc-by-nc-sa.svg';
import type { FC } from 'react';
import { usePostData } from '@/store/hooks';

interface IInfo {
  percent: number;
}

const Info: FC<IInfo> = ({ percent }) => {
  // 获取博客数据
  const { tagKeys, logs } = usePostData();

  return (
    <div className='flex select-none flex-col text-center text-normal'>
      <div className='flex flex-1 flex-col justify-start space-y-2'>
        <div>
          <div className='flex w-full justify-center'>
            <Image src={avator} alt={'头像'} className='-mb-16 -mt-16 scale-50 rounded-[50%]' />
          </div>
          <div className='text-md font-bold text-gray-8'>杨飞</div>
          <div className='text-gray-6'>记录一些前后端的开发技术</div>
        </div>
        <ul className='grid grid-cols-2 divide-x px-28 font-bold text-gray-6'>
          <li>
            <strong className='font-semibold text-gray-9'>{logs}</strong>
            <p>日志</p>
          </li>
          <li>
            <strong className='font-semibold text-gray-9'>{tagKeys}</strong>
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
    </div>
  );
};

export default Info;
