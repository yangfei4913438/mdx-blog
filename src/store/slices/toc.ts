import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initialState: IToc = {
  visible: true, // 默认展示
};

// 切片
const tocSlice = createSlice({
  name: 'toc',
  initialState,
  reducers: {
    setOpen: (state: IToc) => {
      if (state.visible) return state;
      return {
        ...state,
        visible: true,
      };
    },
    setClose: (state: IToc) => {
      if (!state.visible) return state;
      return {
        ...state,
        visible: false,
      };
    },
    customVisible: (state: IToc, actions: PayloadAction<IToc>) => {
      return {
        ...state,
        visible: actions.payload.visible,
      };
    },
  },
});

// 导出 actions
export const tocActions = tocSlice.actions;
// 导出 reducer
export const tocReducer = tocSlice.reducer;
