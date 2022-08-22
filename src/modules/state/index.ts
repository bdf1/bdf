export namespace SSOT {

    type ActionRecord = [ action: string, params: any[] ];
    type QueryRecord = [ query: string, result: any ];
    type HistoryRecord = (ActionRecord | QueryRecord);
    type HistoryData = HistoryRecord[];

    export type StoreAction<P extends any[], R> = (...args: P) => Promise<R>;

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
    }

    interface GlobalState {
        stores: Record<string, any>;
        history: HistoryData,
    }

    const storeRegistry = new Map<string, StoreHandler>;
    const actionRegistry = new Map<string, StoreAction<any[], any>>();

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

    const reset = () => {
        storeRegistry.forEach((handler) => {
            handler.init();
        })
        historyData = [];
    };
    
    const dumpHistory = () => {
        return historyData;
    };

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
    
        return {
            get state() {
                return state;
            },
            registerAction,
        }
    }
}
