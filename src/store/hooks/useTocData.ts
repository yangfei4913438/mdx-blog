import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { tocActions } from '@/store/slices';

const useTocData = () => {
  // 多处引用，并不会引起这里的数据错乱，引用的值保持一致。一处修改，处处同步。
  const { visible } = useAppSelector((state) => state.toc);

  const dispatch = useAppDispatch();

  const setOpen = () => {
    dispatch(tocActions.setOpen());
  };

  const setClose = () => {
    dispatch(tocActions.setClose());
  };

  const customVisible = (visible: boolean) => {
    dispatch(tocActions.customVisible({ visible }));
  };

  return {
    visible,
    setOpen,
    setClose,
    customVisible,
  };
};

export default useTocData;
