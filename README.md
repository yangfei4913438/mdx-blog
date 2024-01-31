## 项目说明

按格式要求，在 `src/markdown/post` 目录下，放入 mdx 或 md 文件，就会自动生成页面。

### 运行项目

```bash
yarn
yarn run dev
```

## 技术选型

### ui框架
next 支持服务端渲染、混合渲染、客户端渲染，react生态第一选项。
- 官网地址: https://nextjs.org/

### 图标库

heroicons 由 tailwind 发布的开源项目，常用图标都有，使用很方便。
- 项目地址: https://github.com/tailwindlabs/heroicons
- 官网地址: https://heroicons.com/

lucide 如果你使用 shadcn, 那使用这个库是最好的，因为安装 shadcn 的时候，会默认安装。
- 图标库地址: https://lucide.dev/icons/

#### 补充
`Bootstrap Icons` 这也是一个很不错的开源图标库，图标数量更多，
- 网址: https://icons.getbootstrap.com/
- 项目地址: https://github.com/twbs/icons

### 状态管理库
redux 是 react 常用的状态管理库，尤其适合复杂项目，这里使用是为了使用而使用（没看错）。
通常在生产项目中，我们会选择更适合业务的状态管理库。 redux 适合复杂的业务场景，比如：编辑器。
一般的业务更推荐 jotai 这类原子化的状态管理库，性能会更好，维护更简单。

- 官网地址: https://redux-toolkit.js.org/

#### jotai 

原子化的状态管理库，适用于绝大多数的业务场景。

- 网址: https://jotai.org/
- 项目地址: https://github.com/pmndrs/jotai

