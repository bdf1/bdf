export namespace SSOT {

    type ActionRecord = [ action: string, params: any[] ];
    type QueryRecord = [ query: string, result: any ];
    type HistoryRecord = (ActionRecord | QueryRecord);
    type HistoryData = HistoryRecord[];

    export type StoreAction<P extends any[], R> = (...args: P) => Promise<R>;
    export type StoreQuery<P extends any[], R> = (...args: P) => Promise<R>;

    export interface StoreHistory {
        dump(): HistoryData;
        apply(data: HistoryData): Promise<void>;
    }

    interface StoreHandler {
        getState(): any;
        setState(state: any): void;
        init(): void;
    }
    
    export interface StoreInstance<S extends Object> {
        /** store 的当前状态 */
        readonly state: S;
        registerAction<P extends any[], R>(name: string, action: (state: S, ...args: P) => R): StoreAction<P, R>;
        registerQuery<P extends any[], R>(name: string, query: (state: S, ...args: P) => R): StoreQuery<P, R>;
    }

    interface GlobalState {
        stores: Record<string, any>;
        history: HistoryData,
    }

    const storeRegistry = new Map<string, StoreHandler>;
    const actionRegistry = new Map<string, StoreAction<any[], any>>();
    const queryRegistry = new Map<string, StoreQuery<any[], any>>();

    let historyData: HistoryData = [];
    
    /**
     * 克隆数据，注意到状态必须是可序列化的，因此使用 JSON 方式最为简单 
     * @param data 
     * @returns 
     */
    const clone = <T>(data: T): T => {
        return JSON.parse(JSON.stringify(data));
    }

    export const dump = (): GlobalState => {

        const storesData = Object.fromEntries(
            [ ...storeRegistry.entries() ].map(([ name, handler ]) => {
                return [ name, handler.getState() ];
            })
        );

        return {
            stores: storesData,
            history: historyData,
        };
    };
    
    export const load = (state: GlobalState) => {
        storeRegistry.forEach((handler, name) => {
            handler.setState(state.stores[name]);
        });
        historyData = state.history;
    };

    export const reset = () => {
        storeRegistry.forEach((handler) => {
            handler.init();
        })
        historyData = [];
    };
    
    const dumpHistory = () => {
        return historyData;
    };

    let isReplaying = false;

    const applyHistory = async (historyData: HistoryData) => {
        for (const [ name, args ] of historyData) {
            const action = actionRegistry.get(name);
            if (!action) {
                throw Error(`[replay] 检测到未注册的录像指令"${action}"`);
            }
            await action(...args);
        }
    };

    export const history = {
        dump: dumpHistory,
        applyHistory: applyHistory,
    };

    export function registerStore<S extends Object>(storeName: string, initializer: () => S): StoreInstance<S> {
    
        if (storeRegistry.has(storeName)) {
            console.error(`[store] 状态源"${ storeName }"已经被注册`);
        }

        let state: S = initializer();
        
        storeRegistry.set(storeName, {
            getState: () => state,
            setState: (_state) => state = _state,
            init: () => {
                state = initializer();
            }
        });
    
        const registerAction = <P extends any[], R>(actionName: string, action: (state: S, ...args: P) => R): StoreAction<P, R> => {
            const wholeName = storeName + '/' + actionName;
            if (actionRegistry.has(actionName)) {
                console.error(`[store] 操作"${ wholeName }"已经被注册`);
            }
            const wrappedAction = async (...args: P) => {
                const record: ActionRecord = [ wholeName, clone(args) ];
                historyData.push(record);
                return action(state, ...args);
            };
            // @ts-ignore
            actionRegistry.set(wholeName, wrappedAction);
            return wrappedAction;
        };

        const registerQuery = <P extends any[], R>(queryName: string, query: (state: S, ...args: P) => R): StoreQuery<P, R> => {
            const wholeName = storeName + '/' + queryName;
            if (queryRegistry.has(queryName)) {
                console.error(`[store] 询问"${ wholeName }"已经被注册`);
            }
            const wrappedQuery = async (...args: P) => {
                if (isReplaying) {
                    const record = historyData.pop();
                    if (!record) {
                        console.error(`[store/replay] 重放失败，尝试读取"${ wholeName }"，但是已经没有剩余操作`);
                        return;
                    }
                    const [queryName, result] = record;
                    if (queryName !== wholeName) {
                        console.error(`[store/replay] 重放失败，尝试读取"${ wholeName }"，实际读取到"${ queryName }"`);
                    }
                    return result;
                } else {
                    const result = query(state, ...args);
                    const record: QueryRecord = [ wholeName, clone(result) ];
                    historyData.push(record);
                    return result;
                }
            };
            // @ts-ignore
            queryRegistry.set(wholeName, wrappedQuery);
            return wrappedQuery;
        };
    
        return {
            get state() {
                return state;
            },
            registerAction,
            registerQuery,
        }
    }
}
