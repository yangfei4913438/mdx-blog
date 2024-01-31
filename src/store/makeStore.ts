import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from '@/store/slices';

export const makeStore = () => {
  return configureStore({
    reducer: {
      post: postReducer,
    },
  });
};

// 推断 makeStore 的类型
export type AppStore = ReturnType<typeof makeStore>;

// 从存储本身推断出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
