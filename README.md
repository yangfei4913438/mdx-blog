## 项目说明

按格式要求，在 `src/markdown/post` 目录下，放入 mdx 或 md 文件，就会自动生成页面。

当前项目只是流程跑通了，能添加文章，能自动化发布更新到云服务器。

具体的前后端优化，还没开始搞，如果遇到客户端适配，美观度一般之类的问题，这个纯属正常，因为我还没开始弄细节。。。

如果有朋友想知道项目怎么部署的，我后面会写篇文章详细介绍一下。

现在大概说一下吧，就是当主分支的特定目录下的文件发生变化，github actions 会调用我写的部署脚本，将当前源码推送到我的阿里云服务器上。

推送完成之后，会执行一个我预留在云服务器上的，一个用于docker构建的 shell 脚本.

这个 shell脚本，就是停掉 next 服务的容器，然后删掉容器，再删掉之前镜像，用新代码重新构建一个镜像。

最后用新的镜像，跑一个next 服务的容器。

nginx 容器只是一个服务器上的代理，和项目有关的，也就是和 next的 docker网络一致。可以代理 web服务。

当然，你也可以直接安装一个 nginx在服务器上，原理都是一样的。

大致就是这样。流程还是很清晰的。

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

