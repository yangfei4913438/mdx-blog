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

  // 直接跳转页面锚点
  const handlePageScroll: (anchorId: string, needClose?: boolean) => MouseEventHandler<HTMLAnchorElement> =
    (anchorId, needClose = false) =>
    (event) => {
      // 阻止默认事件
      event.preventDefault();

      return push(anchorId).finally(() => {
        if (needClose) {
          setClose();
          setSheetClose();
        }
      });
    };

  // 响应 link 点击
  const handleLink: (pathname: string, needClose?: boolean) => MouseEventHandler<HTMLAnchorElement> =
    (pathname, needClose = false) =>
    (event) => {
      // 阻止默认事件
      event.preventDefault();

      return push({ pathname }).finally(() => {
        if (needClose) {
          // 多设置一个关闭没影响，但是可以减少很多判断逻辑
          setClose();
          setSheetClose();
        }
      });
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

      return push({
        pathname: pathname,
        query: { key: keyName },
      }).finally(() => {
        if (needClose) {
          setClose();
          setSheetClose();
        }
      });
    };

  return {
    handleLink,
    handleLinkWithQueryKey,
    handlePageScroll,
  };
};

export default useNextLink;
