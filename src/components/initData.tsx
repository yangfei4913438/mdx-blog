import usePostListData from '@/hooks/usePostListData';
import { useEffect } from 'react';

const InitData = () => {
  // 数据初始化
  usePostListData();

  // 页面加载的时候，滚动到页面顶部
  useEffect(() => {
    // 因为是页面加载的时候，所以无需做平滑效果
    window.scrollTo(0, 0);
  }, []);

  return <span />;
};

export default InitData;
