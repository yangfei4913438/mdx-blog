import { useSyncExternalStore } from 'react';

// 创建一个订阅函数，当窗口尺寸变化时通知外部数据源
function subscribe(callback: () => void) {
  const handleResize = () => callback();
  window.addEventListener('resize', handleResize);

  // 返回取消订阅的函数
  return () => window.removeEventListener('resize', handleResize);
}

// 获取当前的 window.innerHeight 值
function getSnapshot() {
  return window.innerHeight;
}

// 监听窗口大小，并返回实时的值
const useWindowInnerHeight = () => {
  // 使用 useSyncExternalStore 订阅窗口大小变化
  // 第一个参数表示，需要监听什么事件。（因为useSyncExternalStore，是用于捕获react外部数据的，所以通常都是监听 window 事件）
  // 第二个参数，需要返回一个计算好的值。
  // 第三个参数，和第二个一样，只不过只在服务端渲染时生效。这里用不到，所以直接省略了。
  return useSyncExternalStore(subscribe, getSnapshot);
};

export default useWindowInnerHeight;

/**
 * // 在组件中使用该 Hook
 * function MyComponent() {
 *   const innerHeight = useWindowInnerHeight();
 *
 *   return <div>Current window height: {innerHeight}px</div>;
 * }
 * */
