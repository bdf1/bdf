// @ts-check
/**
 * @module ui.js 状态栏UI
 */

import { Sidebar } from "./sidebar/index.js";
import { Topbar } from "./topbar/index.js";

export const extendUI = new class ExtendUI {

    /** @type {HTMLDivElement} */
    rootContainer;
    store = {
        serve: false,
    };

    constructor() {
        new Vue({
            data: this.store,
        });
    }

    /** @private @type { (() => any)[] } */
    _subscribers = [];

    update() {
		if (!extendUI.store.serve) return;
        this._subscribers.forEach((action) => {
            action();
        })
    }

    /**
     * 
     * @param {() => any} action 
     */
    onUpdate(action) {
        this._subscribers.push(action);
    }

    /** @typedef { (payload: any) => any } Command */
    /** @private @type { Record<string, Command> } */
    _actions = {};
    /**
     * 注册一个命令
     * @param {string} name 
     * @param {Command} action 
     */
    registerCommand(name, action) {
        if (name in this._actions) {
            console.warn(`${ name }操作已经被注册过`);
        }
        this._actions[name] = action;
    }
    /**
     * 执行命令
     * @param {string} name 
     * @param {any?} payload 
     */
    execCommand(name, payload) {
        if (name in this._actions) {
            this._actions[name](payload);
        } else {
            console.error(`${ name }操作未被注册过, payload: ${ payload }`);
        }
    }

    /** @typedef {(payload: any) => import("../types/umd.js").VueConstructor} ModalFactory */
    /** @private @type { Record<string, ModalFactory> } */
    _modals = {};
    /**
     * 注册一个窗口
     * @param {string} name 
     * @param {ModalFactory} components 
     */
    registerModal(name, components) {
        if (name in this._modals) {
            console.warn(`${ name }窗口已经被注册过`);
        }
        this._modals[name] = components;
    }

    /**
     * 调用一个窗口
     * @param {string} name 
     * @param {any} payload 
     */
    async callModal(name, payload) {
        core.lockControl();
        if (name in this._modals) {
            const component = this._modals[name](payload);
            const vm = new Vue(component);
            const container = document.createElement("div");
            this.rootContainer.appendChild(container);
            // @ts-ignore
            await vm.wait();
            vm.$destroy();
            container.remove();
        } else {
            console.error(`${ name }操作未被注册过, payload: ${ payload }`);
        }
        core.unlockControl();
    }

    /**
     * 
     * @param {HTMLDivElement} rootContainer 
     */
    init(rootContainer) {
        this.rootContainer = rootContainer;
        const topbarContainer   = document.createElement("div");
        const sidebarContainer  = document.createElement("div");
        const mapBoardContainer = document.createElement("div");
        
        rootContainer.appendChild(topbarContainer);
        rootContainer.appendChild(sidebarContainer);
        rootContainer.appendChild(mapBoardContainer);

        const topbarVM = new Vue(Topbar).$mount(topbarContainer);
        const sidebarVM = new Vue(Sidebar).$mount(sidebarContainer);
        const mapBoardVM = new Vue(MapBoard).$mount(mapBoardContainer);
        
        this.registerCommand("serve", () => {
            // @ts-ignore
            this.store.serve = true;
        });
        
        this.registerCommand("eject", () => {
            // @ts-ignore
            this.store.serve = false;
        });
    }
}

window.extendUI = extendUI;

import { tutorial } from "./modal/tutorial/index.js";
import { MapBoard } from "./map/index.js";
extendUI.registerModal("tutorial", tutorial);
