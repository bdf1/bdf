import { extendUI } from "../index.js";

const _stores = {};

/**
 * 
 * @param {string} id 
 * @param {Record<string, any>} data 
 * @param {() => any} action 
 * @returns 
 */
export function createStore(id, data, action) {
    if (!(id in _stores)) {
        _stores[id] = new Vue({
            data: {
                data,
            }
        });
        extendUI.onUpdate(() => {
            action(_stores[id].data);
        });
    }
    return _stores[id].data;
}