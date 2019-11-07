---
title: docker及docker-compose 安装部署记录
tags:
  - docker
  - gogs
  - egg
categories:
  - Note
photos:
  - /201911012681/1.png
abbrlink: 2681
date: 2019-11-01 18:49:06
---

{% asset_img 1.png 媳妇最美 %}

## 前言

腾讯云服务器将要到期，在忙着服务器搬迁的事，博客也荒废了挺久

## 使用 Docker 的原因

- 学习新的部署方式
- 方便服务器搬迁，快速部署，不会浪费大量时间在环境配置上

## 安装 dokcer

### 安装 Docker CE（社区版）

> 官方教程 https://docs.docker.com/install/linux/docker-ce/centos/

### 安装 DOCKER CE

需要一个 Centos7 以上版本的环境

1. 卸载老版本

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

1. 安装最新版本的 Docker CE 和 containerd

```bash
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

2. 启动 Docker

```bash
$ sudo service docker start
```

3. 验证 docker 是否安装成功

```bash
$ sudo docker -v
```

### 粗心大意的报错

拉取镜像时报错

```bash
Cannot connect to the Docker daemon at unix:///var/run/docker.sock.
```

是因为没启动 docker...

```bash
service docker start
```

## 安装 docker-compose

> docker-compose 是 docker 提供的命令行工具，用来定义和运行多个容器组成的应用。不要每次手动敲启动容器命令。

推荐使用 pip 安装 docker-compose，因为 pip 可以为你自动对应版本问题

```java
// 安装pip
yum -y install epel-release
yum -y install python-pip

// 升级
pip install --upgrade pip

// 如果报这个error，执行下面命令
ERROR: Cannot uninstall 'requests'. It is a distutils installed project and thus we cannot accurately determine which files belong to it which would lead to only a partial uninstall.

// 安装requests
pip install --ignore-installed requests

// 安装docker-compose
pip install docker-compose
```

## 构建 docker-compose.yml

容器之间的通信困扰了挺久，现版本不建议使用`link`来连接两个容器，`link`后续废弃，使用`networks`即可，进入容器内后，ping 另一个容器名，就可以查看另一个容器 IP，所以这边我只在 nginx 容器中暴露 80 端口，其他容器需要访问，直接在 nginx 做转发

启动了三个应用

1. nginx：做容器域名端口的转发
2. gogs：因为公司内网对 github 做了拦截，所以使用 gogs 做中间代码版本库
3. egg-nuxt：后台项目，实现 egg.js + nuxt.js + vue.js 的服务端渲染架子

下方为`docker-compose.yml`范例，仅供参考

```yml
version: '3.7' #使用docker-compose的版本
services:
  nginx:
    image: *****/nginx #使用的镜像
    container_name: 'nginx'
    tty: true
    restart: always
    depends_on: #依赖容器
      - gogs
      - egg-nuxt
    ports:  #端口映射
      - '80:80'
      - '443:443'
    networks:
      - bridge

  gogs:
    image: *****/gogs
    container_name: 'gogs'
    restart: always
    networks:
      - bridge

  egg-nuxt:
    image: *****/egg-nuxt
    container_name: 'egg-nuxt'
    restart: always
    networks:
      - bridge

networks:
  bridge:
```

## Nginx 转发配置

因为每次重装应用后，docker 容器内的网络 IP 会改变，目前有两种方案：

1. 使用容器名作为 host，因为容器是定义好的，不会改变
2. 用 docker 静态 IP ，是容器 IP 固定

```nginx
server {
    listen 80;
    server_name api.com;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass      http://api:7001;

    }
}
```

## docker 及 docker-compose 常用命令

都是自己常用的命令

### docker、nginx

```java
// 查看当前文件大小
du -sh *

// 查看所有端口开放
netstat -ano
netstat -lp

// 查看nginx目录
ps -ef | grep nginx


// 查看正在运行的容器
docker ps

// 查看所有的容器
docker ps -a

// 查看镜像
docker images

// 删除所有未被容器使用的镜像
docker image prune -a

// -d 后台运行
// -it 在容器内可执行shell
// -p 端口映射
// --name 容器名
docker run -d --name=demo -p 7001:7001 gogs

// 进入容器内可执行shell
docker exec -it gogs /bin/bash

// 使用本地容器生成镜像
docker commit -a username -m 'commit' 611f10799671 *****/nginx:v1
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]

// --rm 是删除构建过程中，产生的临时镜像
// -t 是指定镜像名称及标识
// . 代表默认选择Dockerfile为构建文件
docker build --rm -t egg-nuxt:v1.0 .

// 登陆Docker
docker login

// push镜像到Docker Hub
docker push [OPTIONS] NAME[:TAG]

// 查看日志
docker logs *****/nginx
```

### docker-compose

需要在`docker-compose.yml`同级目录执行，命令与 docker 命令基本一致

```java
// 后台启动应用
docker-compose up -d

// 删除删除所有容器,镜像
docker-compose down
```

### Docker hub、github 自动部署

> 在 github 项目的根目录添加`Dockerfile`文件，这样 Docker hub 就可以根据`Dockerfile`文件来自动构建

使用现成的镜像固然很方便，但是有些配置还是需要自定义，所以现成镜像为基本，在上方做一些自定义，再生成新的镜像，就是最好的方式。Docker hub 提供了在云端自动构建镜像的能力。Docker hub 上的配置就不说了，网络上很多

在自动构建 Nodejs 应用的过程遇到以下几点问题：

1. 使用 node 原生镜像，构建的包很大，解压后超过了 1GB
2. 构建时间长，基本要在 4 分钟以上
3. 使用 node alpine 镜像，用 git 拉取 github 代码比较困难

解决方案

1. 使用 node alpine 镜像，体积小，构建速度快
2. 使用 ADD 命令，远程拉取 github 项目的 zip 包

`Dockerfile`范例，仅供参考

```docker
#使用alpine nodejs镜像、体积更小
FROM node:10-alpine
#新建工作目录
RUN mkdir -p /project
#下载项目代码
ADD https://github.com/********/egg-nuxt-framework/archive/master.zip /project/
#解压、安装包、编译TS
RUN cd /project && unzip master.zip && cd egg-nuxt-framework-master && npm install && npm run ci
#进入到app目录下
WORKDIR /project/egg-nuxt-framework-master
#对外暴露的端口
EXPOSE 7001
#程序启动脚本
CMD ["npm", "start"]
```

## 期间遇到的问题

1. 在 push 代码到 gogs 后，gogs 的 post-receive 钩子会再 push 代码到 github，本来使用 ssh，需要在 gogs 容器中生成密钥提交到 github 上。生成后，在测试时发现以下报错

   ```js
   Host key verification failed.
   remote: fatal: Could not read from remote repository.
   ```

   这是因为 ssh 密钥不是 git 用户下生成的，艹，这个地方花了很久才解决，而且调试过程中还遇到了两次...想锤死自己

2. gogs 容器中没有装`vim`，只有`vi`，所以打开 ssh 密钥时，是一行展示的，无法复制，可以使用`scp`命令复制到另一台机器上，使用 vim 打开

3. push 代码不一定要 ssh 密钥，使用 github token 也可以实现，且更加方便
   在 github 上生成 token

   ```java
   git remote add github https://{token}@github.com/*****/egg-nuxt-framework.git
   git push -f github master
   ```

4. push 代码到 gogs 时，一直报错 413

   ```java
   error: RPC failed; HTTP 413 curl 22 The requested URL returned error: 413 Request Entity Too Large
   ```

   是因为 gogs 是用 nginx 做转发，nginx 对上传文件有默认限制

   在 nginx 配置中新增`client_max_body_size 100m;`解决

   默认 1m

## 最后

使用 docker 部署，走了许多弯路，选择合适镜像、容器之间通信就花了挺久，对于一个陌生的领域，确实需要花挺多精力来学习。

共勉
