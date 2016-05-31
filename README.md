Javascript:

This code binds storageProvider object in window scope and
we can use session storage as storageProvider.sessionProvider OR
local storage as storageProvider.localStorageProvider.
NOTE: Both the storage provide memory limit around 5Mb each per domain.

Also added support for cookie storage...
