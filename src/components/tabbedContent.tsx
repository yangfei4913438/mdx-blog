import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePageScroll from '@/hooks/usePageScroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostList from '@/components/postList';
import Info from '@/components/info';
import ScrollComponent from '@/components/ScrollComponent';
import dynamic from 'next/dynamic';

// 因为使用了 useLayoutEffect 所以需要禁止 ssr 渲染这个组件
const DirTree = dynamic(() => import('@/components/dirTree'), { ssr: false });

interface IProps extends PropsWithChildren {
  width: number;
}

const TabbedContent: FC<IProps> = ({ children, width }) => {
  // 获取路由信息
  const { query } = useRouter();
  // 页面滚动距离百分比
  const percent = usePageScroll();
  // 当前选择哪个标签页
  const [tab, setTab] = useState('tree');

  useEffect(() => {
    if (query?.second_dir) {
      setTab('list');
    } else {
      setTab('tree');
    }
  }, [query?.second_dir]);

  return (
    <ScrollComponent width={width}>
      <Tabs
        value={tab}
        onValueChange={setTab}
        className='sticky top-3 mt-3 bg-white pt-4 text-center shadow shadow-gray-5'
      >
        <TabsList>
          <TabsTrigger className='text-base' value='tree'>
            目录
          </TabsTrigger>
          {query?.second_dir && (
            <TabsTrigger className='text-base' value='list'>
              文章列表
            </TabsTrigger>
          )}
          <TabsTrigger className='text-base' value='info'>
            概览
          </TabsTrigger>
        </TabsList>
        <TabsContent value='tree'>
          <DirTree />
        </TabsContent>
        <TabsContent value='list'>
          <PostList />
        </TabsContent>
        <TabsContent value='info'>
          <Info percent={percent} />
        </TabsContent>
        {children}
      </Tabs>
    </ScrollComponent>
  );
};

export default TabbedContent;
