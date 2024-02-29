import type { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { useDialogData, useSheetData } from '@/store';

const useNextLink = () => {
  // 获取路由信息
  const { push } = useRouter();
  // 控制开关，搜索的全屏弹窗
  const { setClose } = useDialogData();
  // 控制开关, 窄屏的侧边弹窗
  const { setClose: setSheetClose } = useSheetData();

  // 响应 link 点击
  const handleLink: (pathname: string, needClose?: boolean) => MouseEventHandler<HTMLAnchorElement> =
    (pathname, needClose = false) =>
    (event) => {
      // 阻止默认事件
      event.preventDefault();

      if (needClose) {
        return push({ pathname }).finally(() => {
          // 多设置一个关闭没影响，但是可以减少很多判断逻辑
          setClose();
          setSheetClose();
        });
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
        }).finally(() => {
          setClose();
          setSheetClose();
        });
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
