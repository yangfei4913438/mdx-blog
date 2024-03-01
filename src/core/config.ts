// 目录排序配置
const dirOrderConfig: IDirOrderConfig = {
  // 这里的 frontend 就是一级目录的名称，下同
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
  reactNative: {
    index: 1,
    children: {
      rn基础: 0,
      rn常用系统组件: 1,
      rn常用api: 2,
      rn动画: 3,
    },
  },
  linux: {
    index: 2,
    children: {
      server: 0,
      docker: 1,
      oss: 2,
      github: 3,
    },
  },
  算法: {
    index: 3,
    children: {
      快速排序: 0,
    },
  },
  前端基础: {
    index: 4,
    children: {
      js: 0,
      css: 1,
      dom: 2,
    },
  },
};

// 目前没有支持三级目录
// 新增目录需要再这里增加配置
export default dirOrderConfig;
