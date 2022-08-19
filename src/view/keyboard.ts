import { packToArray } from "@/utils/common";
import { HookContext, HookContextProxy } from "@/utils/context";
import { computeKeybinding } from "@/utils/keybinding";
import { isEmpty, last } from "lodash-es";
    
export type KeyBinding = number;

export namespace Keyboard {

    type EventType = "keydown" | "keypress" | "keyup";

    export type ProxyAction = (context: HookContextProxy, e: KeyboardEvent) => (boolean | void);
    
    export type ProxyRule = [
        keyBinding: KeyBinding | KeyBinding[],
        action: { trigger?: ProxyAction, finish?: ProxyAction },
        condition?: () => boolean,
    ];
    
    type Action = ((e: KeyboardEvent) => boolean);
    type ActionMap = Record<KeyBinding, Action[]>;
    
    export class Proxy {
    
        eventMap = {
            keydown: {} as ActionMap,
            keypress: {} as ActionMap,
            keyup: {} as ActionMap,
        }
    
        contextMap = new Map<number, HookContext>();
        
        /**
         * 键盘代理，用于监听键盘代理事件
         * @param proxyRules 代理规则集
         */
        constructor(proxyRules: ProxyRule[]) {
            proxyRules.forEach((rule) => {
                this.addRule(rule);
            })
        }

        private extendProxy?: Proxy;

        extend(proxy: Proxy) {
            this.extendProxy = proxy;
        }
    
        emit(type: EventType, e: KeyboardEvent) {
            const keyBinding = computeKeybinding(e);
            const actions = this.eventMap[type][keyBinding];
            // console.log(type, e.key, actions);
            (() => {
                if (actions) {
                    for (const action of actions) {
                        if (!action(e)) {
                            return;
                        }
                    }
                }
                if (this.extendProxy) {
                    this.extendProxy.emit(type, e);
                }
            })();
            // 放开键时，要销毁现有的上下文
            if (type === "keyup") {
                this.contextMap.clear();
            }
        }
    
        addAction(type: EventType, keyBinding: KeyBinding, action: Action) {
            if (!this.eventMap[type][keyBinding]) {
                this.eventMap[type][keyBinding] = [];
            }
            this.eventMap[type][keyBinding].push(action);
        }
    
        private id = 0;
    
        /**
         * 添加键盘代理规则，具体规则释义参见构造函数
         * @param param0 代理规则
         */
        addRule([ keyBinding, { trigger, finish }, condition ]: ProxyRule) {
            const id = this.id++;
            const getContext = () => {
                if (!this.contextMap.has(id)) {
                    this.contextMap.set(id, new HookContext);
                }
                return this.contextMap.get(id)!;
            }
            if (trigger) {
                packToArray(keyBinding).forEach((keyBinding) => {
                    this.addAction("keydown", keyBinding, (e) => {
                        if (condition && !condition()) return true;
                        const context = getContext();
                        context.reset();
                        return trigger(context, e) ?? false;
                    });
                });
            }
            if (finish) {
                packToArray(keyBinding).forEach((keyBinding) => {
                    this.addAction("keyup", keyBinding, (e) => {
                        if (condition && !condition()) return true;
                        const context = getContext();
                        context.reset();
                        return finish(context, e) ?? false;
                    });
                });
            }
        }
    
        /**
         * 代理弹出时，要清空按键上下文
         */
        eject() {
            this.contextMap.clear();
            this.extendProxy = void 0;
        }
    }

    export const useTimestamp = (context: HookContextProxy) => {
        const [ lastTimestamp, setLastTimestamp ] = context.use(0);
        const currentTimestamp = Date.now();
        const delta = currentTimestamp - lastTimestamp;
        const update = () => {
            setLastTimestamp(currentTimestamp);
        }
        return [
            { lastTimestamp, currentTimestamp, delta }, { setLastTimestamp, update }
        ] as const;
    }

    /**
     * 生成长按无效的键盘代理规则
     * @param action 
     * @returns 
     */
    export function noLongPress(action: ProxyAction): ProxyAction {
        return (context, e) => {
            const [ isFirst, setIsFirst ] = context.use(true);
            console.log(isFirst);
            if (!isFirst) return;
            setIsFirst(false);
            action(context, e);
        };
    }
    
    /**
     * 生成长按节流的键盘代理规则
     * @param action 
     * @param time 节流的频率，即两次触发间的最短间隔 
     * @returns 
     */
    export function throttleLongPress(action: ProxyAction, time: number): ProxyAction {
        return (context, e) => {
            const [ { delta }, { update } ] = useTimestamp(context);
            if (delta < time) return;
            update();
            action(context, e);
        };
    }
    
    export class Manager {
    
        focusStack: [number, Proxy][] = [];
    
        constructor() {
            this.push(new Proxy([]));
        }
    
        listen() {
            document.addEventListener("keydown", (e) => {
                last(this.focusStack)![1].emit("keydown", e);
            });
            document.addEventListener("keyup", (e) => {
                last(this.focusStack)![1].emit("keyup", e);
            });
        }

        private id = 0;

        extend(proxy: Proxy) {
            proxy.extend(last(this.focusStack)![1]);
            return this.push(proxy);
        }
    
        push(proxy: Proxy) {
            const id = this.id++;
            this.focusStack.push([ id, proxy ]);
            console.log(`[keyboard] push proxy [${ id }] =`, proxy);
            return id;
        }
    
        /**
         * 将代理从管理器中弹出
         * @param id 要弹出的代理的id，特别的，传入-1可以弹出当前栈顶的代理(不推荐)
         * @returns 
         */
        pop(id: number) {
            console.log(`[keyboard] pop proxy [${ id }]`);
            if (id === -1) {
                this.focusStack.pop();
                return;
            }
            while (true) {
                if (isEmpty(this.focusStack)) {
                    console.warn("[KeyboardManager] 尝试执行弹出代理时，未能找到给定的代理");
                    break;
                }
                const top = this.focusStack.pop()!;
                top[1].eject();
                if (top[0] === id) {
                    break;
                }
            }
        }
    }  
}
    
export const keyboardManager = new Keyboard.Manager();

keyboardManager.listen();