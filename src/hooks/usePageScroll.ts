import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

// 监听页面滚动
const usePageScroll = () => {
  // 滚动百分比的值, 默认是 0，也就是没滚动
  const [percent, SetPercent] = useState(0);

  // 计算滚动百分比
  const getScroll = useCallback(() => {
    // 当前滚动高度
    const currentScrollHeight = window.scrollY;
    // 完整滚动高度
    const fullScrollHeight = document.body.scrollHeight - window.innerHeight;
    // 计算出百分比数值
    const percent = (currentScrollHeight / fullScrollHeight) * 100;
    // 更新数据，向下取整
    SetPercent(Math.floor(percent));
  }, []);

  useEffect(() => {
    // 监听页面滚动
    window.addEventListener('scroll', getScroll);
    return () => {
      window.removeEventListener('scroll', getScroll);
    };
  }, [getScroll]);

  // 返回滚动百分比
  return percent;
};

export default usePageScroll;
