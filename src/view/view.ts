import { EventHook } from "@/utils/eventHook";
import { isEmpty, last } from "lodash-es";
import { Component, markRaw, reactive } from "vue";

/**
 * 视图图层handler
 */
export interface ViewLayerHandler<T> {
    /**
     * 关闭当前视图图层
     * @param value 
     */
    close(value: T): Promise<T>
    /**
     * 关闭前的钩子，并行触发，返回Promise可阻塞关闭
     * @param hook 
     */
    beforeClose(hook: (value: T) => any): void
    /**
     * 等待图层被关闭
     */
    waitClose(): Promise<T>
}

function createViewLayerHandler<T>(): ViewLayerHandler<T> {
    let closeResolve: (value: T) => void;
    const closePromise = new Promise<T>((res) => {
        closeResolve = res; 
    })
    const hook = new EventHook<[T]>();
    const close = async (value: T) => {
        await Promise.all(hook.call(value));
        closeResolve(value);
        return value;
    }
    const onBeforeClose = (action: (value: T) => any) => {
        hook.tap(action);
    };
    const waitClose = () => {
        return closePromise;
    };
    return {
        close,
        beforeClose: onBeforeClose,
        waitClose,
    };
}

/**
 * UI栈
 */
class ViewManager {

    stack: [Component, ViewLayerHandler<any>][] = reactive([]);

    /**
     * 向UI栈中追加一个UI，当其被释放时，promise完成
     * 为了保证UI栈的正确性，当一个组件不在栈顶时，会将其上方的所有组件一并弹出
     * @param component UI的vue根组件
     */
    push<T = void>(component: Component) {
        const handler = createViewLayerHandler<T>();
        this.stack.push(markRaw([component, handler]));
        handler
            .waitClose()
            .then(() => {
                while (true) {
                    const top = last(this.stack);
                    if (!top) {
                        console.error("UI栈错误");
                        break;
                    }
                    this.stack.pop();
                    if (top[1] === handler) {
                        break;
                    }
                };
            });
        return handler;
    }
}

export const viewManager = new ViewManager();
