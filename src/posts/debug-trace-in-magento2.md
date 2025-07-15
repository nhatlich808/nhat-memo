---
title: "Debug trace in Magento 2"
date: "2025-07-11"
excerpt: ""
author: "Nhat"
tag: "magento2 debug trace"
eid: "3"
---

To trace the call stack in Magento 2, you can insert the following code into your function:

```php
    $debugBackTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
    foreach ($debugBackTrace as $item) {
        echo @$item['class'] . @$item['type'] . @$item['function'] . ""\n"";
    }
```

If you want to log the trace to system.log, use this version:

```php
    $debugBackTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
    $logger = \Magento\Framework\App\ObjectManager::getInstance()->create(\Psr\Log\LoggerInterface::class);
    foreach ($debugBackTrace as $item) {
        $logger->warning(@$item['class'] . @$item['type'] . @$item['function'] . ""\n"");
    }
```

For more details, refer to this helpful resource: [https://magento.stackexchange.com/questions/152886/how-to-use-debug-backtrace-in-magento-2](https://magento.stackexchange.com/questions/152886/how-to-use-debug-backtrace-in-magento-2)