---
title: usort自定义排序
date: 2018-09-25
tags:
  - PHP
categories:
  - Code
---

## usort 自定义排序

> 工作上需要对 php 数组自定义排序，使用了 usort 函数，但若比较参数中，出现空字符串时，这样含有空字符串的元素就是拍在前面

<!--more-->

```php
$demo = ["3", "2" ,"", "5", ""];

// 使用自定义排序函数
usort($demo, "myusort");

/**
 * 不考虑元素为空字符串
 * @param $a
 * @param $b
 * @return int
 */
function myusort($a, $b) {
   // 差值
   $diff = strtotime($a) - strtotime($b);
   if ($diff == 0) return 0;
   return $diff > 0 ? 1 : -1;
}

/* 结果为
array (size=5)
  0 => string "" (length=0)
  1 => string "" (length=0)
  2 => string "2" (length=1)
  3 => string "3" (length=1)
  4 => string "5" (length=1)
*/
```

> 现需求为元素为空字符串时，排在末尾

```php
/**
 * 考虑元素为空字符串
 * @param $a 为后一个元素
 * @param $b 为前一个元素
 * @return int 返回1，则位置不变化，返回-1则调换位置
 * 返回0时、如果两个元素比较结果相同，则它们在排序后的数组中的顺序未经定义。
 * 到 PHP 4.0.6 之前，用户自定义函数将保留这些元素的原有顺序。
 * 但是由于在 4.1.0 中引进了新的排序算法，结果将不是这样了，因为对此没有一个有效的解决方案
 */
function myusort($a, $b) {

    // 单独做处理
    if (empty($a)) {
        return 1;
    }
    if (empty($b)) {
        return -1;
    }

   // 差值
   $diff = strtotime($a) - strtotime($b);
   if ($diff == 0) return 0;
   return $diff > 0 ? 1 : -1;
}
/* 结果为
array (size=5)
  0 => string "2" (length=1)
  1 => string "3" (length=1)
  2 => string "5" (length=1)
  3 => string "" (length=0)
  4 => string "" (length=0)
*/
```
