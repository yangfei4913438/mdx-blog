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
    setOpen: () => {
      return {
        visible: true,
      };
    },
    setClose: () => {
      return {
        visible: false,
      };
    },
    customVisible: (state: IDialog, actions: PayloadAction<IDialog>) => {
      return {
        ...state,
        visible: actions.payload.visible,
      };
    },
    changeVisible: (state: IDialog) => {
      return {
        visible: !state.visible,
      };
    },
    reset: () => {
      return initialState;
    },
  },
});

// 导出 actions
export const dialogActions = dialogSlice.actions;
// 导出 reducer
export const dialogReducer = dialogSlice.reducer;
