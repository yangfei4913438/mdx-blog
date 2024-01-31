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
    setPostInfos: (state: typeof initialState, actions: PayloadAction<typeof initialState.postInfos>) => {
      return {
        ...state,
        postInfos: actions.payload,
      };
    },
    setTags: (state: typeof initialState, actions: PayloadAction<typeof initialState.tags>) => {
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
