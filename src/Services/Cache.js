"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
class Cache {
    constructor() {
        this.store = new Map();
    }
    remember(key, callback) {
        if (!this.store.has(key)) {
            this.store.set(key, callback());
        }
        return this.store.get(key) || "";
    }
}
exports.Cache = Cache;
