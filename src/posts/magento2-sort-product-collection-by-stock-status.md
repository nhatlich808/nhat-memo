---
title: "Magento 2 - Sort product collection by stock status"
date: "2025-07-15"
excerpt: ""
author: "Nhat"
tag: "sort product collection by stock status"
eid: "7"
---

#### Information

In Magento 2, the feature to **sort product collections by stock status** is built-in and can be found in the following class:

```
(Magento CE 2.4.5)
vendor/magento/module-inventory-catalog/Plugin/Catalog/Model/ResourceModel/Product/CollectionPlugin.php
```

This functionality allows Magento to group products based on their stock status. Specifically, it separates the product collection into two distinct groups:

- **In-stock products**
- **Out-of-stock products**

#### Suggestions

This feature is particularly useful in scenarios such as:

- Displaying all **in-stock** products at the beginning or end of lists like category pages, bestseller widgets, etc.
- Filtering product collections by stock status to improve user experience and conversion rates.
