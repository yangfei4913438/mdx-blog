'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from './makeStore';

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // 在这首次渲染时创建存储实例
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
