---
title: 使用Travis CI持续集成Hexo博客
categories:
  - Code
tags:
  - TravisCI
  - Hexo
photos:
  - /2019091039107/ci.png
abbrlink: 39107
date: 2019-09-10 18:00:25
---

{% asset_img ci.png 媳妇最美 %}

> Travis CI 教程和讲解，可以查看阮一峰老师的[《持续集成服务 Travis CI 教程》](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)

## 前言

使用 Travis CI 的原因，也很简单，就是在写完博客的时候，不希望在本地构建、发布，于是想到能不能在远端构建发布?

Travis CI 正好满足了这个要求，Github 上开源的仓库，都可以使用它进行持续集成

## 需求

- 上传 Hexo 博客源码，自动部署到相应的静态 Pages 仓库上
- 本站对国内、国外做了 CNAME 区分，国内访问 Coding Pages，国外访问 Github Pages（有利于百度 SEO，因为百度不收录 Github Pages），这样的话，Hexo 构建发布时需要发布到两个静态 Pages 仓库上

## 登陆 Travis CI

使用 Github 账户登陆 Travis CI，登陆完成后，打开设置，找到 Hexo 源码仓库，打开开关，这样 Travis CI 就可以监听到这个仓库的变动

完成以上操作，接下来就是编写 Travis CI 配置文件了

{% asset_img 3.jpg 媳妇最美 %}

## 新建配置文件

- 在 Hexo 项目根目录新建`.travis.yml`
- 字段名定义都很清晰，就是将每次部署命令，写在配置文件中，Travis CI 检测到仓库变动后， 会去读取`.travis.yml`命令，一步一步执行，直到部署成功

```yml
# 语言
language: node_js
# node版本
node_js:
  - 8
# 指定缓存模块
cache:
  directories:
    - node_modules
# 监听分支
branches:
  only:
    - master
# 下载主题
before_install:
  - git clone https://github.com/shixiaohu2206/hexo-theme-huhu.git themes/huhu
install:
  - npm install
script:
  - hexo clean
  - hexo generate
after_script:
  - git config user.name "Utone"
  - git config user.email "asjdr123@163.com"
  - sed -i "s/{GITHUB_TOKEN}/${GITHUB_TOKEN}/g" ./_config.yml
  - sed -i "s/{TENCENT_TOKEN}/${TENCENT_TOKEN}/g" ./_config.yml
  - hexo deploy
# 通知
notifications:
  email:
    - asjdr123@163.com
  on_success: change
  on_failure: always
```

## 获取 token

> Travis CI 构建部署时是没有权限来 push 代码的，所以这里用 Token 来 push 代码
> 需要 https 格式 git 地址

Github 的 Personal access tokens 不需要`<token-name>`，直接使用 token 即可

```bash
git push https://<token>@giturl
```

Coding 的项目令牌，需要`<token-name>`

```bash
git push https://<token-name>:<token>@giturl
```

### Github 获取 Access Token

新建一个 Personal access tokens，成功后，记录下来，Github 的 Access Token 只会显示一次，后续就无法查看

{% asset_img 1.jpg 媳妇最美 %}

### Coding 获取项目令牌

需要将`推送至代码仓库`勾选上

{% asset_img 2.png 媳妇最美 %}

确认新增后，点击查看密码，记录`令牌用户名`、`令牌密码 (token)`

{% asset_img 4.png 媳妇最美 %}

## Travis CI 新增环境变量

token 属于敏感数据，一定不能暴露在开源仓库中

所以我们需要在 Travis CI 新增环境变量（对外不可见），这样构建时，用环境变量来替换 hexo 的配置文件中占位符，再来执行`hexo d`

Hexo 源码根目录下`_config.yml`，修改`deploy`配置

```yml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  - type: git
    repository: https://{GITHUB_TOKEN}@giturl
    branch: master
  - type: git
    repository: https://{TENCENT_USERNAME}:{TENCENT_TOKEN}@giturl
    branch: master
```

Travis CI 新增环境变量

新增 NAME 与`deploy`配置中占位符`GITHUB_TOKEN`保持一致，将获取的 token，对应填入，点击保存

{% asset_img 5.png 媳妇最美 %}

修改`.travis.yml`，用`sed`命令，将上述保存的环境变量替换占位符

```yml
after_script:
  - git config user.name "Utone"
  - git config user.email "asjdr123@163.com"
  - sed -i "s/{GITHUB_TOKEN}/${GITHUB_TOKEN}/g" ./_config.yml
  - sed -i "s/{TENCENT_TOKEN}/${TENCENT_TOKEN}/g" ./_config.yml
  - hexo deploy
```

## 完成部署

终于不用在本地执行`hexo deploy`了，写完博文，直接 push 代码即可

{% asset_img 6.png 媳妇最美 %}

Travis CI 部署有可能会失败，可以查看`Job log`查看运行日志

## 感谢 Travis CI

Travis CI 专为开源项目做远端持续集成，非常感谢

{% asset_img 7.jpg 媳妇最美 %}
从`Travis CI`官网搬来的团队合影（侵删）
