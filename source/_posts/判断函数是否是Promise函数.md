---
title: 判断函数是否是Promise函数
tags:
  - JavaScript
  - Promise
categories:
  - Code
abbrlink: 25453
date: 2018-09-29 00:00:00
---

```javascript
// 判断函数是否是Promise函数
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}
```
