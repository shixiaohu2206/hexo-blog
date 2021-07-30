---
title: React Diff
abbrlink: 11845
date: 2021-05-17 21:57:20
tags:
---

### Virtour Dom

本质上是 JavaScript 对象，这个对象就是更加轻量级的对 DOM 的描述

### Diff 算法目的

比较新旧 Virtour DOM 中需要改变的部分，对并其进行原生 DOM 操作，尽可能的减少 DOM 操作。

### Diff 算法三个策略

即使使用最前沿的算法，全量对比 DOM 树，算法复杂程度也要为 O(n 3 )。为了降低算法复杂度，提高性能，React 做出以下预设：

1. Web UI 开发中，节点跨层级的移动操作较少，忽略不计
2. 相同类生成的组件有相似的树形结构、不同类生成的组件生成不同的树形结构
3. 同一层级的子节点可以使用唯一的 Key 标识

### Diff 算法三个粒度

#### Tree Diff

对树进行分层比较，两棵树只会对同一层节点进行比较。

#### Component Diff

- 不同类型的组件，标记为`dirty component`，就直接删除该组件及其所有子节点，并创建新节点及其子节点
- 同一类型的组件，React 允许用户使用`shouldComponentUpdate`来判断组件是否需要 diff

#### Element Diff

当节点处于同一层级时，React diff 提供三种节点操作

- 插入 INSERT_MARKUP
- 移动 MOVE_EXISTING
- 删除 REMOVE_NODE

#### 移动 REMOVE_NODE

对新集合的节点循环遍历，通过唯一 KEY 判断老集合中是否存在相同的节点。如果有相同的节点就执行移动操作。

将当前节点在老集合的 index 与 lastindex 比较，当 index 小于 lastindex 小时，则进行节点移动操作。这是一种顺序优化手段，lastIndex 一直在更新，表示访问过的节点在老集合中最右的位置（即最大的位置）

如果新集合中当前访问的节点 index 比 lastIndex 大，说明当前访问节点在老集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，因此不用添加到差异队列中，即不执行移动操作，只有当访问的节点 index 比 lastIndex 小时，才需要进行移动操作

#### key 范例

```html
// 前
<ul>
  <li key="one"></li>
  <li key="two"></li>
</ul>
```

```html
// 后
<ul>
  <li key="two"></li>
  <li key="one"></li>
</ul>
```

上述的变化，只是`li`元素移动了位置，dom 节点属性没有变化

如果没有`key`，那么 React 会按照 2 的预设，同级比较，会删除`one`节点，重新生成`two`节点，新建 DOM 节点浪费的性能是巨大的。

有了`key`后，React 就可以知道，两个 li 节点只是移动了位置，那 DOM 节点就可以复用，做到最少的操作 DOM

### 参考

- https://segmentfault.com/a/1190000017152570
- https://zhuanlan.zhihu.com/p/20346379
