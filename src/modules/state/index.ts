import { EventHook } from "@/utils/eventHook";

interface StoreAction<P extends any[], R> {
    (...args: P): Promise<[R, Promise<any>]>;
    beforeExec(hook: (args: P) => any): void;
    afterExec(hook: (args: P, r: R) => any): void;
}

interface SubstoreInstance<S extends Object> {
    state: S;
    registerAction<P extends any[], R>(action: (...args: P) => R): StoreAction<P, R>;
}

type QueryRecord = [ query: string, result: any ];
type ActionRecord = [ action: string, params: any[], queries: QueryRecord[] ];
type HistoryData = ActionRecord[];

interface StoreHistory {
    dump(): HistoryData;
    apply(data: HistoryData): Promise<void>;
}

interface StoreInstance<P extends any[], S extends Object> {
    /** 获取 store 的当前状态，初始化完成前调用会抛出异常 */
    useState(): S;
    dump(): [S, HistoryData];
    load(data: [S, HistoryData]): void;
    init: (...args: P) => void;
    registerAction<P extends any[], R>(name: string, action: (state: S, ...args: P) => R): StoreAction<P, R>;
    history: StoreHistory;
    // registerSubstore(): SubstoreInstance<S>;
}

export function defineStore<P extends any[], S extends Object>(initializer: (...args: P) => S): StoreInstance<P, S> {
    
    let state: S;
    let currentAction: ActionRecord | undefined;
    let historyData: HistoryData;

    const useState = () => {
        if (!state) {
            throw Error("[state] 状态尚未初始化");
        }
        return state;
    };

    /**
     * 克隆数据，注意到状态必须是可序列化的，因此使用 JSON 方式最为简单 
     * @param data 
     * @returns 
     */
    const clone = <T>(data: T): T => {
        return JSON.parse(JSON.stringify(data));
    }

    const dump = (): [S, HistoryData] => {
        return clone([ state, historyData ]);
    }

    const load = ([ _state, _historyData ]: [ S, HistoryData ]) => {
        state = _state;
        historyData = _historyData;
    };

    const init = (...args: P) => {
        state = initializer(...args);
        historyData = [];
    };

    const actionRegistry = new Map<string, StoreAction<any[], any>>();

    const registerAction = <P extends any[], R>(name: string, action: (state: S, ...args: P) => R): StoreAction<P, R> => {
        if (actionRegistry.has(name)) {
            throw Error(`[replay] 操作"${ name }"已经被注册`);
        }
        const beforeHook = new EventHook<[P]>();
        const afterHook = new EventHook<[P, R]>();
        const wrappedAction = async (...args: P): Promise<[R, Promise<any>]> => {
            await Promise.all(beforeHook.call(args));
            const record: ActionRecord = [ name, clone(args), [] ];
            currentAction = record;
            historyData.push(record);
            const result = action(state, ...args);
            currentAction = void 0;
            const finish = Promise.all(afterHook.call(args, result));
            return [ result, finish ];
        };
        wrappedAction.beforeExec = beforeHook.tap.bind(beforeHook);
        wrappedAction.afterExec = afterHook.tap.bind(afterHook);
        // @ts-ignore
        actionRegistry.set(name, wrappedAction);
        return wrappedAction;
    };

    const dumpHistroy = () => {
        return clone(historyData);
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

    const history = {
        dump: dumpHistroy,
        apply: applyHistory,
    }

    return {
        useState,
        dump,
        load,
        init,
        registerAction,
        history,
    }
}
