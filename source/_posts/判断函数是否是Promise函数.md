---
title: 判断函数是否是Promise函数
date: 2018-09-29
tags:
  - JavaScript
  - Promise
categories:
  - Code
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

<!--more-->
