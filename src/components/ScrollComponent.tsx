import React, { useState, useRef, useEffect, FC, PropsWithChildren } from 'react';
import throttle from 'lodash-es/throttle';

// 拿到上面 dom的宽度传递进来
const ScrollComponent: FC<PropsWithChildren & { width: number }> = ({ children, width }) => {
  // 创建一个ref来引用滚动的div
  const scrollDivRef = useRef<HTMLDivElement>(null);
  // 用于存储滚动位置的状态
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = throttle(() => {
    // 给div添加滚动监听
    const div = scrollDivRef.current!;
    // 当滚动事件发生时，更新状态
    setScrollTop(div.getBoundingClientRect().top);
  }, 10);

  useEffect(() => {
    // 添加滚动监听
    window.addEventListener('scroll', onScroll);
    // 清除事件监听器
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div ref={scrollDivRef}>
      {/* 这里必须用父子层级的 div 来处理 */}
      <div style={scrollTop < 0 ? { transform: 'translateZ(0px)', top: '0px', position: 'fixed', width: width } : {}}>
        {children}
      </div>
    </div>
  );
};

export default ScrollComponent;
