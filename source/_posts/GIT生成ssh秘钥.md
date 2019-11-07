---
title: git生成ssh秘钥
tags:
  - Git
  - SSH
categories:
  - Code
abbrlink: 11568
date: 2017-10-20 00:00:00
---

```bash
// 查看是否存在秘钥
$ cd ~/.ssh

// 配置用户相关信息
$ git config –global user.name ‘xxxxx’
$ git config –global user.email ‘xxx@xx.xxx’

// 查看用户配置的相关信息
$ git config user.name
$ git config user.email

// 生成秘钥 (邮箱为上方配置的邮箱)
$ ssh-keygen -t rsa -C ‘xxx@xx.xxx’

// 连按三个空格
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Mr.Yang/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Mr.Yang/.ssh/id_rsa.
Your public key has been saved in /c/Users/Mr.Yang/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:zA6wNJrFB6NcqS6eBog/AHlzQuvFjYpG759Yhh1lWGI xxxxxx@xxxxx.xxx(上面自己的邮箱)
The key"s randomart image is:
+---[RSA 2048]----+
|    +E .         |
| ..+oo+          |
| oo+*+.o         |
|o.*===+o         |
|==+*... S        |
|B.+.o .o         |
|++o. +  .        |
| +o.+ .          |
|.  o.o           |
+----[SHA256]-----+
```

**~/ .ssh 文件夹下，生成两个文件，id_rsa（私有秘钥）和 id_rsa.pub（公有密钥）
d_rsa.pub（公有密钥）可上传至远端，免密 push**
