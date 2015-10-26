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

    function CookieStorageProvider() {
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

    CookieStorageProvider.prototype.get = function(key) {
        if(!key || !_.isString(key)) {
            return;
        }
        var allCookies = document.cookie.split(';');
        var resultCookies = _.chain(allCookies).map(function(cookie) {
            var cookieObj = {};
            var split = _.map(cookie.split('='), function(data) {
                return data.trim();
            });
            if(_.first(split) === key) {
                return JSON.parse(split[1] || '');
            }
            return false;
        }).compact().value();
        return resultCookies.length ? _.first(resultCookies) : null;
    };

    CookieStorageProvider.prototype.set = function(key, value) {

        var cookie = key.toString() + '=' + JSON.stringify(value);
        document.cookie = cookie;
    };

    CookieStorageProvider.prototype.removeItem = function(key) {
        if(!key) {
            return;
        }
        //setting previous time to expires will delete cookie.
        document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    SessionProvider.prototype = Object.create(Storage.prototype);
    LocalStorageProvider.prototype = Object.create(Storage.prototype);
    this.storageProvider = this.storageProvider || {};
    this.storageProvider.sessionStorageProvider = this.storageProvider.sessionStorageProvider || new SessionProvider();
    this.storageProvider.localStorageProvider = this.storageProvider.localStorageProvider || new LocalStorageProvider();
    this.latas.cookieStorageProvider = this.latas.cookieStorageProvider || new CookieStorageProvider();

}).call(this);
