// 目录排序配置
const dirOrderConfig = {
  // 这里的 frontend 就是一级目录的名称，下同
  frontend: {
    // 这里的 index 就是这个一级目录的排序，下同
    index: 0,
    // 这里的 children 表示下级目录，需要根据这个属性查询下级目录，下同
    children: {
      react: 0, // 下级目录的名称和排序，下同
      rn: 1,
      js: 2,
      css: 3,
      dom: 4,
      test: 5,
      antd: 6,
    },
  },
  linux: {
    index: 1,
    children: {
      server: 0,
      docker: 1,
      oss: 2,
      github: 3,
    },
  },
  algorithm: {
    index: 2,
    children: {
      quick_sort: 0,
    },
  },
};

// 目前没有支持三级目录
// 新增目录需要再这里增加配置
export default dirOrderConfig;
