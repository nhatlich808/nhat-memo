---
title: "Magento 2 - How to build MySQL queries with special syntax"
date: "2025-07-15"
excerpt: ""
author: "Nhat"
tag: "mysql syntax"
eid: "6"
---

#### Description

In Magento 2, we use the `\Zend_Db_Expr` class to build MySQL queries with special syntax, particularly when raw SQL expressions are required

#### Incorrect Usage

```php
    $productIds = [178,216,354];
    $collection->getSelect()->order("find_in_set(e.entity_id,'".implode(',',$productIds)."')");
```

This approach may lead to syntax errors or unexpected behavior because the query string is passed as plain text rather than an expression.

#### Correct Usage

```php
    $productIds = [178,216,354];
    $collection->getSelect()->order(new \Zend_Db_Expr("find_in_set(e.entity_id,'".implode(',',$resultIds)."')"));
```

Using \Zend_Db_Expr ensures the SQL expression is treated properly by Magento’s query builder and avoids quoting issues.