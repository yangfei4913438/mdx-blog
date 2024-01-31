import {  useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import type { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  className?: string;
}

// 在 body 下渲染内容
const RenderInBody: FC<IProps> = ({ className, children }) => {
  useEffect(() => {
    // 创建一个容器来存放传递进来的东西
    const node = document.createElement('div');
    // 处理类名
    if (className) {
      className.split(' ').forEach(cls => {
        node.classList.add(cls);
      });
    }
    // 添加到body
    document.body.appendChild(node);
    // 渲染新增子节点
    const container = createRoot(node);
    container.render(children);

    return () => {
      if (node) {
        // 卸载
        container.unmount()
        // body移除子节点
        document.body.removeChild(node);
      }
    };
  }, [children, className]);

  return null;
};

export default RenderInBody;
