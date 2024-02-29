import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { dialogActions } from '@/store/slices';

const useDialogData = () => {
  // 多处引用，并不会引起这里的数据错乱，引用的值保持一致。一处修改，处处同步。
  const { visible } = useAppSelector((state) => state.dialog);

  const dispatch = useAppDispatch();

  const setOpen = () => {
    dispatch(dialogActions.setOpen());
  };

  const setClose = () => {
    dispatch(dialogActions.setClose());
  };

  const changeVisible = () => {
    dispatch(dialogActions.changeVisible());
  };

  const customVisible = (visible: boolean) => {
    dispatch(dialogActions.customVisible({ visible }));
  };

  return {
    visible,
    setOpen,
    setClose,
    changeVisible,
    customVisible,
  };
};

export default useDialogData;
