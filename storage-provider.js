/*
*  This code binds storageProvider object in window scope and
*  we can use session storage as storageProvider.sessionProvider OR
*  local storage as storageProvider.localStorageProvider.
*  NOTE: Both the storage provide memory limit around 5Mb each per domain.
*/

'use strict';
(function() {
    function Storage() {
    };

    function SessionProvider() {
        this.storage = sessionStorage;
    };

    function LocalStorageProvider() {
        this.storage = localStorage;
    };

    Storage.prototype.set = function (key, value) {
        if(!(key && value)) {
            return false;
        }
        key = key.toString();
        this.storage.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.get = function(key) {
        if(!key) {
            return false;
        }
        key = key.toString();
        return JSON.parse(this.storage.getItem(key))
    };

    Storage.prototype.clear = function() {
        this.storage.clear();
    };

    Storage.prototype.removeItem = function(key) {
        if(!key) {
            return false;
        }
        key = key.toString();
        this.storage.removeItem(key);
    };

    SessionProvider.prototype = Object.create(Storage.prototype);
    LocalStorageProvider.prototype = Object.create(Storage.prototype);
    this.storageProvider = this.storageProvider || {};
    this.storageProvider.sessionStorageProvider = this.storageProvider.sessionStorageProvider || new SessionProvider();
    this.storageProvider.localStorageProvider = this.storageProvider.localStorageProvider || new LocalStorageProvider();

}).call(this);
