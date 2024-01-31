import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { postActions } from '@/store/slices';

const usePostData = () => {
  // 多处引用，并不会引起这里的数据错乱，引用的值保持一致。一处修改，处处同步。
  const { postInfos, tags } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  const setPostInfos = (infos: IPostInfo[]) => {
    dispatch(postActions.setPostInfos(infos));
  };

  const setTags = (tags: { [key: string]: number }) => {
    dispatch(postActions.setTags(tags));
  };

  return {
    postInfos,
    tags,
    logs: postInfos.length,
    tagKeys: Object.keys(tags).length,
    setPostInfos,
    setTags,
  };
};

export default usePostData;
