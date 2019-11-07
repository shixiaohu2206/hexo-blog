---
title: Hexo博客添加站内搜索服务
tags:
  - Swiftype
  - Algolia
categories:
  - Code
photos:
  - /2019083151629/7.jpg
abbrlink: 51629
date: 2019-08-31 16:24:49
---

{% asset_img 7.jpg 媳妇最美 %}

# 前言

> 注意网上目前关于 Hexo Algolia 的教程基本都不是[Algolia DocSearch](https://community.algolia.com/docsearch/)，而是 Algolia 服务，但是貌似没有不提供前端（文档太多，没去细看）。hexo 还有一个插件[hexo-algolia](https://github.com/oncletom/hexo-algolia)，是将博文内容传到 Algolia。查看 Hexo 官网源码，才发现使用是 [Algolia DocSearch](https://community.algolia.com/docsearch/)。还有一个吐槽的点，现在网上的教程大多是千篇一律，大多是粘贴复制，也不知道有没有过期的设置，时间发表从 15 年到 18 年都有，但是内容都一毛一样，百度搜索出来的教程，一点都没有意义。

## 选择

> 最近重新写了一个 Hexo 主题[hexo-theme-huhu](https://github.com/shixiaohu2206/hexo-theme-huhu)来搭建博客站点，在选择站内搜索时有些犹豫。

- [hexo-generator-json-content](https://community.algolia.com/docsearch/)，Hexo 插件，生成博文 JSON 文件，前端启动搜索时，请求文件内容，来检索内容。需要自行写前端。不依赖第三方服务，稳定可靠
- [Swiftype](https://app.swiftype.com)，提供一整套站内搜索服务，引入官方的脚本即可。有免费 14 天试用期。试用期过后，听说还可以用，但内容更新较慢，速度也变慢
- [Algolia DocSearch](https://community.algolia.com/docsearch/)，是 Algolia 下的一个服务，不需要注册。Hexo、React、Vue 官网都在使用

# Algolia DocSearch

## 安装

```bash
$ npm install --save hexo-algolia
```

## [hexo-theme-huhu](https://github.com/shixiaohu2206/hexo-theme-huhu) 配置

在 Hexo 根目录配置\_config.yml 中添加

```yaml
algolia:
  applicationID: 'applicationID'
  apiKey: 'apiKey'
  indexName: '...'
```

# Swiftype

## 注册

看其他教程有说必须要使用工作邮箱注册才可以，但是我使用了 Google 账号登陆，亲测可行

## 创建引擎

{% asset_img 1.png 媳妇最美 %}

创建一个新的引擎，输入博客网址后，开始抓取网站内容，抓取时间不定，大概十几分钟到一个小时左右

## 自定义设置

可以自定义配置，如样式、展示方式、搜索字段。一般选用默认就够用了

{% asset_img 4.png 媳妇最美 %}

展示方式有两种：一种是搜索启动按钮悬浮在底部，一种需要在页面中增加一个`input`输入框（我选择了这种方式）

{% asset_img 5.png 媳妇最美 %}

启动按钮悬浮在底部

## 安装代码

{% asset_img 2.png 媳妇最美 %}

等抓取结束后，点击左侧的`Install Search`后，就可以获取安装代码了

{% asset_img 3.png 媳妇最美 %}

> 注意：右侧的红框中的代码，直接用鼠标复制，不是完全的代码。打开 F12 后，发现下方还有剩余的代码（没有滚动条的 textarea，坑爹）

将安装代码复制到`body`标签内

```js
<script type="text/javascript">
  (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
  (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
  e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
  })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');

  _st('install','xxxxx-xxxxxx-xxxxxx','2.0.0');
</script>
```

在页面中合适的位置，新增一个`class="st-default-search-input"`的`input`元素

```html
<input type="text" class="st-default-search-input" />
```

## [hexo-theme-huhu](https://github.com/shixiaohu2206/hexo-theme-huhu) 配置

获取上面伪代码中`xxxxx-xxxxxx-xxxxxx`，在 Hexo 根目录配置\_config.yml 中添加

```yaml
#swiftype
swiftype:
  appKey: 'xxxxx-xxxxxx-xxxxxx'
```

大功告成
