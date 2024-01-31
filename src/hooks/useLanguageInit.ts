import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useLanguageInit = () => {
  const router = useRouter();

  useEffect(() => {
    const tag = sessionStorage.getItem('langInit');
    // 已经初始化，就不执行任何操作。
    if (tag) return;
    // 标记已经初始化
    sessionStorage.setItem('langInit', 'yes');

    // 根据浏览器语言来初始化页面多语言
    if (window.navigator.language !== 'en') {
      router.replace(router.pathname, '', { locale: 'zh', scroll: false });
    } else {
      router.replace(router.pathname, '', { locale: 'en', scroll: false });
    }
  }, [router.pathname]);
};

export default useLanguageInit;
