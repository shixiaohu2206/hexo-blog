---
title: Flex弹性布局
abbrlink: 23020
date: 2020-10-30 21:56:42
tags:
---

### 说明

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

### 容器属性

- flex-wrap
- flex-direction
- flex-flow 是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。
- justify-content
- align-items
- aligh-content 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

容器属性定义容器内的子元素的布局

### 项目属性

- order 定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
- flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- flex-shrink 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。负值对该属性无效。默认为 1
- flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。
- flex 是`flex-grow,` `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。
  建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
- aligh-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

### flex 简写

flex: 1 === flex: 1 1 0%;

flex 属性可以指定 1 个，2 个或 3 个值。

1. 单值语法: 值必须为以下其中之一:

- 一个无单位数(<number>): 它会被当作`<flex-grow>`的值。
- 一个有效的宽度(width)值: 它会被当作 `<flex-basis>`的值。
- 关键字 none，auto 或 initial.

2. 双值语法: 第一个值必须为一个无单位数，并且它会被当作 `<flex-grow>` 的值。第二个值必须为以下之一：

- 一个无单位数：它会被当作 <flex-shrink> 的值。
- 一个有效的宽度值: 它会被当作 <flex-basis> 的值。

3. 三值语法:

- 第一个值必须为一个无单位数，并且它会被当作 <flex-grow> 的值。
- 第二个值必须为一个无单位数，并且它会被当作 <flex-shrink> 的值。
- 第三个值必须为一个有效的宽度值， 并且它会被当作 <flex-basis> 的值。

### flex 特殊值

- initial 元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器 。相当于将属性设置为"flex: 0 1 auto"。

- auto 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "flex: 1 1 auto".

- none 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"。

### flex 计算宽度

问`left`和`right`宽度多少 px？

```css
* {
  padding: 0;
  margin: 0;
}
.container {
  width: 600px;
  height: 300px;
  display: flex;
}
.left {
  flex: 1 2 500px;
  background: red;
}
.right {
  flex: 2 1 400px;
  background: blue;
}
```

由 CSS 可以得知，容器的总宽度为`600px`，子元素的`flex-basis`相加超出容器宽度`300px`

那接下来就计算这`300px`怎么由子元素平分缩小

> 注意：两个子元素的`flex-shrik`分别为`2`和`1`，但实际浏览器并不是按照`2:1`来平分`300px`缩小的

首先计算子元素的`flex-basic`与`flex-shrik`的乘积，并求和

```
left:  2 * 500 = 1000
right: 1 * 400 = 400

total: 1000 + 400 = 1400
```

计算缩小占比，再与多出的`300px`，求出缩小数值

```
left:  (1000 / 1400) * 300 = 214.2857142857143
right: (400  / 1400) * 300 = 85.71428571428571
```

再用`flex-basic`相减，得出最终宽度

```
left:  500 - 214.2857142857143 = 285.7142857142857
right: 400 - 85.71428571428571 = 314.2857142857143
```
