import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initialState: IPost = {
  postInfos: [],
  tags: {},
};

// 切片
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostInfos: (state: IPost, actions: PayloadAction<IPost['postInfos']>) => {
      return {
        ...state,
        postInfos: actions.payload,
      };
    },
    setTags: (state: IPost, actions: PayloadAction<IPost['tags']>) => {
      return {
        ...state,
        tags: actions.payload,
      };
    },
    reset: () => {
      return initialState;
    },
  },
});

// 导出 actions
export const postActions = postSlice.actions;
// 导出 reducer
export const postReducer = postSlice.reducer;
