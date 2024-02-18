import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePageScroll from '@/hooks/usePageScroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DirTree from '@/components/dirTree';
import PostList from '@/components/postList';
import Info from '@/components/info';

const TabbedContent: FC<PropsWithChildren> = ({ children }) => {
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
  );
};

export default TabbedContent;
