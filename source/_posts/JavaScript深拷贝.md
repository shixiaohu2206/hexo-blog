---
title: JavaScript深拷贝
date: 2018-10-17
tags:
  - JavaScript
categories:
  - Code
---

1. slice 和 concat 这两个方法，仅适用于对不包含引用对象的一维数组的深拷贝，对于对象数组的操作，还是浅拷贝

<!--more-->

2. JSON 对象的 parse 和 stringify （对象中不含有函数的话。JSON 解析反解析就行了,对于有函数属性的话，不起作用，会直接去除 function）
3. `$.extend( [deep]`, `target`, `object1 [, objectN] )` jquery 的方法 `extend b=$.extend(true,[],a)`;
4. 递归复制

5. ```js
   let d = JSON.parse(JSON.stringify(a)) //深复制包含子对象
   let c = { ...a } //拷贝一层但不包含子对象
   b = a //浅拷贝
   ```

6. ```js
   // 基本类型 是深拷贝
   var a = 1
   var b = a
   a = 2
   console.log(a, b) // 2, 1 ，a b指向不同的数据

   // 引用类型指向同一份数据
   var a = { c: 1 }
   var b = a
   a.c = 2
   console.log(a.c, b.c) // 2, 2 全是 2，a b 指向同一份数据

   //方法 1:通过递归
   function deepCopy(o, c) {
     var c = c || {}
     for (var i in o) {
       if (typeof o[i] === 'object') {
         if (o[i].constructor === Array) {
           c[i] = []
         } else {
           c[i] = {}
         }
         deepCopy(c[i], o[i])
       } else {
         c[i] = o[i]
       }
       return c
     }
   }
   //方法 2:通过 json 解析 function不可复制
   var result = JSON.parse(JSON.stringify(test))
   ```
