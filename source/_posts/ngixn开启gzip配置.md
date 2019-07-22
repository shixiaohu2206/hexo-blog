---
title: Nginx开启gzip配置
date: 2019-02-01
tags:
  - Nginx
  - Linux
categories:
  - Code
---

## Nginx 开启 gzip 配置

```bash
server {
    listen 80;
    server_name  www.utone.xyz;

    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_comp_level 5;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6].";

    location / {
        root /data/blog/shixiaohu2206.github.io;
        #error_page  404/data/blog/shixiaohu2206.github.io/404.html;
        #try_files $uri /index.html;
        index index.html;
    }
}

```

## 配置

- gzip on
  设置允许压缩的页面最小字节数，页面字节数从 header 头中的 Content-Length 中进行获取默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大。
- gzip_buffers 4 16k
  获取多少内存用于缓存压缩结果，‘4 16k’表示以 16k\*4 为单位获得
- gzip_comp_level 5
  gzip 压缩比（1~9），越小压缩效果越差，但是越大处理越慢，所以一般取中间值;
- gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php
  对特定的 MIME 类型生效,其中'text/html’被系统强制启用
- gzip_http_version 1.1
  识别 http 协议的版本,早起浏览器可能不支持 gzip 自解压,用户会看到乱码
- gzip_vary on
  启用应答头"Vary: Accept-Encoding"
- gzip_proxied off
  nginx 做为反向代理时启用,off(关闭所有代理结果的数据的压缩),expired(启用压缩,如果 header 头中包括"Expires"头信息),no-cache(启用压缩,header 头中包含"Cache-Control:no-cache"),no-store(启用压缩,header 头中包含"Cache-Control:no-store"),private(启用压缩,header 头中包含"Cache-Control:private"),no_last_modefied(启用压缩,header 头中不包含"Last-Modified"),no_etag(启用压缩,如果 header 头中不包含"Etag"头信息),auth(启用压缩,如果 header 头中包含"Authorization"头信息)
- gzip_disable msie6
  (IE5.5 和 IE6 SP1 使用 msie6 参数来禁止 gzip 压缩 )指定哪些不需要 gzip 压缩的浏览器(将和 User-Agents 进行匹配),依赖于 PCRE 库
