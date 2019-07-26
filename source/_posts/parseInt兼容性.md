---
title: parseInt兼容性
tags:
  - JavaScript
categories:
  - Code
abbrlink: 22541
date: 2018-09-11 00:00:00
---

```js
/*
 * parseInt在不同的浏览器下有不同的默认行为处理
 * 需要传为第二个参数10，采用10进制转化
 */
parseInt('09') // IE8下，默认用八进制转化，结果为0
parseInt('09', 10) // IE8下，结果正常
```
