---
title: PHP连接MySql常用方法
date: 2017-11-30
tags:
  - PHP
  - MySql
categories:
  - Code
---

## 面向过程连接

```php
// 配置
$mysql_server="localhost";
$mysql_username="数据库用户名";
$mysql_password="数据库密码";
$mysql_database="数据库名";
// 建立数据库链接
$conn = mysql_connect($mysql_server,$mysql_username,$mysql_password) or die("数据库链接错误");
// 选择某个数据库
mysql_select_db($mysql_database,$conn);
mysql_query("set names "utf8"");
// 执行MySQL语句
$result=mysql_query("SELECT id,name FROM 数据库表");
// 提取数据
$row=mysql_fetch_row($result);
```

## 面向对象连接

```php
$db=new mysqli($dbhost,$username,$userpass,$dbdatabase);
if(mysqli_connect_error()){
echo "Could not connect to database.";
exit;
}
$result=$db->query("SELECT id,name FROM user");
$row=$result->fetch_row();
```

## PDO 连接方式

```php
$dsn="mysql:host=".$dbhost.";dbname=".$dbdatabase.";"
$dbh=new PDO($dsn,$username,$userpass);
$stmt=$dbh->query("SELECT id,name FROM user");
$row=$stmt->fetch();
```
