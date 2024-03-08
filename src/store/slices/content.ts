import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initialState: IContent = {
  content: '',
};

// 切片
const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state: IContent, actions: PayloadAction<IContent>) => {
      return {
        ...state,
        content: actions.payload.content,
      };
    },
  },
});

// 导出 actions
export const contentActions = contentSlice.actions;
// 导出 reducer
export const contentReducer = contentSlice.reducer;
