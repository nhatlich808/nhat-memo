---
title: "Magento 2: `Invalid customer address id xxx` Error"
date: "2025-07-15"
excerpt: ""
author: "Nhat"
tag: "customer quote, invalid customer address, validate quote address"
eid: "4"
---

#### Magento 2: *"Invalid customer address id xxx"* Error

In Magento 2, the error `"Invalid customer address id xxx"` is related to a **quote address validation issue**, which occurs in the `validateForCart` function of the class:

```
    vendor/magento/module-quote/Model/QuoteAddressValidator.php
```

#### Root Cause:

This error is typically caused by incorrect data in the quote. Specifically, the `customer_is_guest` field in the **customer quote** is incorrectly set to `1`. For registered customers, this value **must be set to `0`**.

#### Reference:

For more details and the proposed solution, refer to this GitHub discussion: [Magento Issue #23618 – Invalid customer address ID](https://github.com/magento/magento2/issues/23618#issuecomment-929293382)