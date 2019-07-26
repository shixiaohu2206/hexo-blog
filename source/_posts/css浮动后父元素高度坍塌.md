---
title: css浮动后父元素高度坍塌
tags:
  - Css
  - Float
categories:
  - Code
abbrlink: 53956
date: 2018-10-17 23:21:38
---

```css
/* 
  *  父元素不写高度时，子元素写了浮动后，父元素会发生高度塌陷
  *  所以要清除浮动
  *  给父级添加overflow:hidden 清除浮动方法
  *  万能清除法 after伪类 清浮动(现在主流方法，推荐使用)
*/
.float_div:after {
  content: ".";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
```
