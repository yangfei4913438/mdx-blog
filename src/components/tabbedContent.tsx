import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import usePageScroll from '@/hooks/usePageScroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostList from '@/components/postList';
import Info from '@/components/info';
import ScrollComponent from '@/components/ScrollComponent';
import dynamic from 'next/dynamic';
import useWindowInnerHeight from '@/hooks/useWindowInnerHeight';

// 因为使用了 useLayoutEffect 所以需要禁止 ssr 渲染这个组件
const DirTree = dynamic(() => import('@/components/dirTree'), { ssr: false });

// 文章目录，只能使用客户端渲染
const BlogToc = dynamic(() => import('@/components/blogToc'), { ssr: false });

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
  // 实时获取内部高度
  const innerHeight = useWindowInnerHeight();

  useEffect(() => {
    if (query?.second_dir) {
      setTab('toc');
    } else {
      setTab('tree');
    }
  }, [query?.second_dir]);

  const containerStyle = useMemo(() => {
    const maxHeight = `${innerHeight - 120}px`;
    return { maxHeight, overflow: 'scroll' };
  }, [innerHeight]);

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
              二级目录
            </TabsTrigger>
          )}
          {query?.second_dir && (
            <TabsTrigger className='text-base' value='toc'>
              文章目录
            </TabsTrigger>
          )}
          <TabsTrigger className='text-base' value='info'>
            概览
          </TabsTrigger>
        </TabsList>
        <TabsContent value='tree'>
          <div style={containerStyle}>
            <DirTree />
          </div>
        </TabsContent>
        <TabsContent value='toc'>
          <div style={containerStyle}>
            <BlogToc />
          </div>
        </TabsContent>
        <TabsContent value='list'>
          <div style={containerStyle}>
            <PostList />
          </div>
        </TabsContent>
        <TabsContent value='info'>
          <div style={containerStyle}>
            <Info percent={percent} />
          </div>
        </TabsContent>
        {children}
      </Tabs>
    </ScrollComponent>
  );
};

export default TabbedContent;
