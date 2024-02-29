import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initialState: ISheet = {
  visible: false,
};

// 切片
const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setOpen: (state: ISheet) => {
      if (state.visible) return state;
      return {
        ...state,
        visible: true,
      };
    },
    setClose: (state: ISheet) => {
      if (!state.visible) return state;
      return {
        ...state,
        visible: false,
      };
    },
    customVisible: (state: ISheet, actions: PayloadAction<ISheet>) => {
      return {
        ...state,
        visible: actions.payload.visible,
      };
    },
  },
});

// 导出 actions
export const sheetActions = sheetSlice.actions;
// 导出 reducer
export const sheetReducer = sheetSlice.reducer;
