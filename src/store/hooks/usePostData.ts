import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { postActions } from '@/store/slices';
import { useMemo } from 'react';
import dirOrderConfig from '@/core/config';

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

  // 二级目录映射到一级目录
  const valueKeyMap = useMemo(() => {
    const keys = Object.keys(dirOrderConfig);
    const valMap: { [k: string]: string } = {};
    keys.forEach((k) => {
      const vals = Object.keys(dirOrderConfig[k].children);
      vals.forEach((val) => {
        // 二级目录名称处理成小写
        // 一级目录的名称不能处理
        valMap[String(val).toLowerCase()] = k;
      });
    });
    return valMap;
  }, []);

  // 一级目录的名称，用于匹配
  const firstDirs = useMemo(() => Object.keys(dirOrderConfig).map((k) => String(k).toLowerCase()), []);

  // 词云数据
  const wordcloud = useMemo(() => {
    return Object.entries(tags).map(([k, v]) => ({ name: String(k).toUpperCase(), value: v }));
  }, [tags]);

  return {
    postInfos,
    tags,
    wordcloud,
    logs: postInfos.length,
    tagKeys: Object.keys(tags).length,
    valueKeyMap,
    firstDirs,
    setPostInfos,
    setTags,
  };
};

export default usePostData;
