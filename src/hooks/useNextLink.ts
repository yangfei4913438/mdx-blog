import type { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { useDialogData } from '@/store';

const useNextLink = () => {
  // 获取路由信息
  const { push } = useRouter();
  // 控制开关
  const { setClose } = useDialogData();

  // 响应 link 点击
  const handleLink: (pathname: string, needClose?: boolean) => MouseEventHandler<HTMLAnchorElement> =
    (pathname, needClose = false) =>
    (event) => {
      // 阻止默认事件
      event.preventDefault();

      if (needClose) {
        return push({ pathname }).finally(setClose);
      }

      return push({ pathname });
    };

  // 响应 link 点击
  const handleLinkWithQueryKey: (
    pathname: string,
    keyName: string,
    needClose?: boolean // 是否需要关闭窗口
  ) => MouseEventHandler<HTMLAnchorElement> =
    (pathname, keyName, needClose = false) =>
    (event) => {
      // 阻止默认事件
      event.preventDefault();

      if (needClose) {
        return push({
          pathname: pathname,
          query: { key: keyName },
        }).finally(setClose);
      }

      return push({
        pathname: pathname,
        query: { key: keyName },
      });
    };

  return {
    handleLink,
    handleLinkWithQueryKey,
  };
};

export default useNextLink;
