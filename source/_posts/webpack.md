---
title: webpack
abbrlink: 15317
date: 2021-05-17 21:57:20
tags:
---

### 介绍

Webpack 是一个打包模块化 JavaScript 工具

### webpack 与 gulp 的异同

- 都是前端构建工具
- gulp 基于任务和流，找到文件后，对其做一系列链式操作。一些单一的、轻量化任务可又 gulp 来处理。例如打包编译 CSS 文件
- gulp 需要开发者将构建过程拆分成多个`Task`，并合理分配控制`Task`的调用关系，而 webpack 只需要开发者找到开发入口，并清除不同的资源需要使用的`Loader`。

### Loader

webpack 本身只支持`js`和`json`文件。Loader 给予 webpack 处理其他类型文件的能力

```js
module: {
  rules: [
    {
      // 用正则去匹配要用该 loader 转换的 CSS 文件
      test: /\.css$/,
      use: ['style-loader', 'css-loader?minimize']
    }
  ]
}
```

loader 中 use 的执行顺序是从后向前的。

`'css-loader?minimize'`中`minimize`已`querystring`的方式传参，告诉`css-loader`需要压缩文件

常用 loader

- style-loader 把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- css-loader 使 CSS 文件以模块方式引入
- less-loader 加载和编译 less 文件
- sass-loader 加载和编译 sass/scss 文件
- babel-loader 将 ES6+语法编译为 ES5 后浏览器才能解析
- url-loader 用于加载图片，超过一定大小返回 data url

### plugin

plugin 是用来扩展 webpack 功能的，通过在构建流程中注入钩子实现

常见 loader

- commons-chunk-plugin 提取公共代码

### webpack 基本流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### webpack 前端优化

- 压缩代码。删除多余的代码、注释、简化代码的写法等等方式。可以利用 webpack 的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩 JS 文件， 利用 cssnano（css-loader?minimize）来压缩 css
- 静态资源 CDN 加速。在构建过程中，将引用的静态资源路径修改为 CDN 上对应的路径。可以利用 webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径
- 删除死代码（Tree Shaking）。将代码中永远不会走到的片段删除掉。可以通过在启动 webpack 时追加参数--optimize-minimize 来实现
- 提取公共代码

### 提高 webpack 构建速度

- 多入口情况下，使用 CommonsChunkPlugin 来提取公共代码
- 通过 externals 配置来提取常用库
- 利用 DllPlugin 和 DllReferencePlugin 预编译资源模块 通过 DllPlugin 来对那些我们引用但是绝对不会修改的 npm 包来进行预编译，再通过 DllReferencePlugin 将预编译的模块加载进来。
- 使用 Happypack 实现多线程加速编译
- 使用 webpack-uglify-parallel 来提升 uglifyPlugin 的压缩速度。 原理上 webpack-uglify-parallel 采用了多核并行压缩来提升压缩速度

- https://segmentfault.com/a/1190000015883378
- <link rel="dns-prefetch" href="//js.cdn.com">
