import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { sheetActions } from '@/store/slices';

const useSheetData = () => {
  // 多处引用，并不会引起这里的数据错乱，引用的值保持一致。一处修改，处处同步。
  const { visible } = useAppSelector((state) => state.sheet);

  const dispatch = useAppDispatch();

  const setOpen = () => {
    dispatch(sheetActions.setOpen());
  };

  const setClose = () => {
    dispatch(sheetActions.setClose());
  };

  const customVisible = (visible: boolean) => {
    dispatch(sheetActions.customVisible({ visible }));
  };

  return {
    visible,
    setOpen,
    setClose,
    customVisible,
  };
};

export default useSheetData;
