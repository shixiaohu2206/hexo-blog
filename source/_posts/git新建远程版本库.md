---
title: git新建远程版本库
tags:
  - Git
categories:
  - Code
abbrlink: 57915
date: 2018-08-15 00:00:00
---

## 前提为已安装好 git

```bash
// 新建一个文件夹，文件名为项目名
mkdir hexo.git

// 进入文件夹，初始化
cd hexo.git
git init --bare

// 生成好初始git文件后，更改文件夹的所属组，所属用户
chown -R git:git hexo.git
```
