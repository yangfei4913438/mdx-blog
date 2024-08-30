// 目录排序配置
const dirOrderConfig: IDirOrderConfig = {
  // 这里的 react 就是一级目录的名称，下同
  react: {
    // 这里的 index 就是这个一级目录的排序，下同
    index: 0,
    // 这里的 children 表示下级目录，需要根据这个属性查询下级目录，下同
    children: {
      优化: 0, // 下级目录的名称和排序，下同
      状态管理: 1,
      hooks: 2,
      工程化: 3,
      拖拽: 4,
      测试: 5,
      antd: 6,
    },
  },
  开发通用: {
    index: 1,
    children: {
      代码格式化: 0,
    },
  },
  工作思考: {
    index: 2,
    children: {
      职场: 0,
      前端: 1,
    },
  },
  reactNative: {
    index: 3,
    children: {
      rn基础: 0,
      rn常用系统组件: 1,
      rn常用api: 2,
      rn动画: 3,
      rn路由管理: 4,
      rn桥接原生: 5,
      rn打包发布: 6,
      rn热修复: 7,
    },
  },
  nest: {
    index: 4,
    children: {
      nest基础: 0,
      nest接口: 1,
      nest存储: 2,
    },
  },
  linux: {
    index: 5,
    children: {
      server: 0,
      docker: 1,
      oss: 2,
      github: 3,
    },
  },
  算法: {
    index: 6,
    children: {
      快速排序: 0,
    },
  },
  前端基础: {
    index: 7,
    children: {
      js: 0,
      css: 1,
      dom: 2,
    },
  },
};

export const siteInfo = {
  name: '前端探索',
  desc: '全是干货的技术笔记',
  home: '首页',
  tag: '标签',
  about: '关于',
  search: '搜索',
  url: 'https://www.yangfei.wiki',
  keywords:
    '杨飞的笔记,杨飞的博客,杨飞,yangfei,笔记,博客,前端,后端,react,nest,native,next,shadcn,tailwind,redux,mdx,markdown,docker,linux,oss,github',
};

// 目前没有支持三级目录
// 新增目录需要再这里增加配置
export default dirOrderConfig;
