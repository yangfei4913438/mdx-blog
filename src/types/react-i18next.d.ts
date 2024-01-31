import 'react-i18next';

// 数据结构使用中文的翻译，这样提示也是中文的
import common from 'public/locales/zh/common.json';

type ttt = typeof common;

declare module 'react-i18next' {
  // 固定接口名称
  interface CustomTypeOptions {
    // 自定义资源类型, 固定 key 名称
    resources: {
      common: ttt;
    };
  }
}
