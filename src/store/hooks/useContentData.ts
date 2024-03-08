import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { contentActions } from '@/store/slices';

const useContentData = () => {
  // 多处引用，并不会引起这里的数据错乱，引用的值保持一致。一处修改，处处同步。
  const { content } = useAppSelector((state) => state.content);

  const dispatch = useAppDispatch();

  const setContent = (content: any) => {
    dispatch(contentActions.setContent({ content }));
  };

  return {
    content,
    setContent,
  };
};

export default useContentData;
