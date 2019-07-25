---
title: Linux安装NodeJS
date: 2017-10-18
tags:
  - JavaScript
  - NodeJS
  - Linux
categories:
  - Code
---

## 安装 NodeJS

> 首先下载 node 安装包，下载编译好的，下载完毕，解压后，直接软连接设置成全局，即可使用

```bash
#进入安装包放置的位置
cd /usr/local/src

#下载安装包，这个是编译好的安装包，不要make && make install
wget https://nodejs.org/dist/v6.11.4/node-v6.11.4-linux-x64.tar.xz

# 解压并进入 // 可能会报错（gzip: stdin: not in gzip format） 去掉z参数
tar -zxvf node-v6.11.4-linux-x64.tar.xz

#软链接、设置成全局
ln -s /usr/local/src/node-v6.11.4-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/src/node-v6.11.4-linux-x64/bin/npm /usr/local/bin/npm

#查看node版本
node -v
```

## 安装 Express 框架

```js
//首先安装马云爸爸的淘宝cnpm命令
npm install -g cnpm --registry=https://registry.npm.taobao.org

//建立软链接
ln -s /usr/local/src/node-v6.11.4-linux-x64/bin/cnpm /usr/local/bin/cnpm

// 先安装express-generator脚手架(新版本须装)
cnpm install -g express-generator

// 安装Express
cnpm install -g express

// 建立软链接
ln -s /usr/local/src/node-v6.11.4-linux-x64/bin/express /usr/local/bin/express

// 创建项目
cd /project
express app

// 进入app项目，安装相关依赖
cnpm install

// 启动node进程
npm start

// 浏览器访问http://127.0.0.1:3000
Express欢迎页面呈现
```

## 安装 Forever 守护模块

```js
// https://github.com/foreverjs/forever
// 可以使用Lniux命令，后台运行node服务
nohup npm start &
```
