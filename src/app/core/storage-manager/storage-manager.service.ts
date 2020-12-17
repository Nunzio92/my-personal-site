/// <reference path="../../../../node_modules/typescript/lib/lib.es6.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class StorageManagerService {

    virtualSessionStorage: any;
    virtualLocalStorage: any;
    storageWritable: boolean;

    /**
     * Service that manage browser's storage smartly: when they are not available they will create data structures
     * similar to the storage. This happens for example when you are on Safari in Private mode.
     */
    constructor() {
        try {
            window.sessionStorage.setItem('test', 'test');
            window.sessionStorage.removeItem('test');
            this.storageWritable = true;
        } catch (e) {
            this.storageWritable = false;
        }
    }

    /**
     * Get JSON object from sessionStorage
     * @param key sessionStorage key
     * @param defaultValue default JSON value
     * @returns {any} returns the corresponding object, if not exist the getter key returns defaultValue if defined
     *                otherwise return NULL
     */
    public getSessionItem(key: string, defaultValue?: any): any {
        let value = null;
        if (this.storageWritable) {
            value = sessionStorage.getItem(key);
        } else {
            value = this.virtualSessionStorage[key];
        }

        if (value != null) {
            return JSON.parse(value);
        } else {
            return defaultValue;
        }
    }

    /**
     * Write JSON object inside the sessionStorage at defined key
     * @param key sessionStorage key
     * @param value JSON object to write in sessionStorage
     */
    public setSessionItem(key: string, value: any): void {
        const data = JSON.stringify(value);
        if (this.storageWritable) {
            sessionStorage.setItem(key, data);
        } else {
            this.virtualSessionStorage[key] = data;
        }
    }

    /**
     * Remove the key into the sessionStorage
     * @param key sessionStorage key to remove
     */
    public removeSessionItem(key: string): void {
        if (this.storageWritable) {
            sessionStorage.removeItem(key);
        } else {
            delete this.virtualSessionStorage[key];
        }

    }

    /**
     * Clear all sessionSotrage items
     */
    public clearAllSession(): void {
        if (this.storageWritable) {
            sessionStorage.clear();
        } else {
            this.virtualSessionStorage = {};
        }
    }

    /**
     * Get JSON object from localStorage
     * @param key localStorage key
     * @param defaultValue default JSON value
     * @returns {any} returns the corresponding object, if not exist the getter key returns defaultValue if defined
     *                otherwise return NULL
     */
    public getLocalItem(key: string, defaultValue?: any): any {
        let value = null;
        if (this.storageWritable) {
            value = localStorage.getItem(key);
        } else {
            value = this.virtualLocalStorage[key];
        }

        if (value != null) {
            return JSON.parse(value);
        } else {
            return defaultValue;
        }
    }

    /**
     * Write JSON object inside the localStorage at defined key
     * @param key localStorage key
     * @param value JSON object to write in localStorage
     */
    public setLocalItem(key: string, value: any): void {
        const data = JSON.stringify(value);
        if (this.storageWritable) {
            localStorage.setItem(key, data);
        } else {
            this.virtualLocalStorage[key] = data;
        }
    }

    /**
     * Check if exist specific key in Local storage
     * @param key to check key in storage
     * @returns {boolean} true if key exist, false otherwise
     */
    public hasLocalItem(key: string): boolean {
        return this.getLocalItem(key, null) !== null;
    }

    /**
     * Check if exist specific key in Session storage
     * @param key to check key in storage
     * @returns {boolean} true if key exist, false otherwise
     */
    public hasSessionItem(key: string): boolean {
        return this.getSessionItem(key, null) !== null;
    }

    /**
     * Remove the key into the localStorage
     * @param key localStorage key to remove
     */
    public removeLocalItem(key: string): void {
        if (this.storageWritable) {
            localStorage.removeItem(key);
        } else {
            delete this.virtualLocalStorage[key];
        }
    }

    /**
     * Clear all localStorage items
     */
    public clearAllLocal(): void {
        if (this.storageWritable) {
            localStorage.clear();
        } else {
            this.virtualLocalStorage = {};
        }

    }

}
