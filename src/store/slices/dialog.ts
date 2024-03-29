import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initialState: IDialog = {
  visible: false,
};

// 切片
const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setOpen: (state: IDialog) => {
      if (state.visible) return state;
      return {
        ...state,
        visible: true,
      };
    },
    setClose: (state: IDialog) => {
      if (!state.visible) return state;
      return {
        ...state,
        visible: false,
      };
    },
    customVisible: (state: IDialog, actions: PayloadAction<IDialog>) => {
      return {
        ...state,
        visible: actions.payload.visible,
      };
    },
  },
});

// 导出 actions
export const dialogActions = dialogSlice.actions;
// 导出 reducer
export const dialogReducer = dialogSlice.reducer;
