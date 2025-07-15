---
title: "Magento 2 - Detail of function `merge quote` after customer logged in"
date: "2025-07-15"
excerpt: ""
author: "Nhat"
tag: "quote, load quote by customer, merge quote after login"
eid: "5"
---

#### Merge Quote Feature in Magento 2

In Magento 2, the *merge quote* feature is an advanced functionality that activates when a customer logs in. It automatically transfers all items from the guest quote into the customer’s existing quote. This ensures that products added before authentication are not lost once the user logs in.

#### Enhanced User Experience

By retaining items added during the guest session, Magento 2 offers a seamless shopping experience, reducing friction and increasing conversion rates.

#### Technical References

Implemented in Magento 2 core:
    
- **Event:** `customer_login`  
  → *File:* `vendor/magento/module-checkout/Observer/LoadCustomerQuoteObserver.php`  
  → *Function:* `loadCustomerQuote()`
- **Session Class:**  
  → *File:* `vendor/magento/module-checkout/Model/Session.php`

