import { TOWER_ID } from "@/constant";
import localforage from "localforage";
import { EmptyDriver } from "./drivers/empty";
import { LocalforageDriver } from "./drivers/localforage";

export enum DriverType {
    Empty,
    Localforage,
    // LocalforageWithCompress,
    // JSInterface // JSInterface坑太多了，，，
}

export interface StorageDriver {
    id: DriverType;
    ready(): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<T>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    length(): Promise<number>;
    key(keyIndex: number): Promise<string>;
    keys(): Promise<string[]>;
    iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U | undefined>;
}

/**
 * 大文件存储
 * 兼容多种工作模式
 */
class LargeFileStorage {

    // @ts-ignore
    private driver: StorageDriver;
    private _readyPromise: Promise<void>;

    constructor() {
        /**
         * @todo 存储策略：
         * 受到设备影响，每次运行可用的存储方式可能不同，导致无法读取上次的存储
         */
        const drivers = [
            LocalforageDriver,
        ];
        this._readyPromise = (async () => {
            for (const driver of drivers) {
                const instance = new driver();
                if (await this.test(instance)) {
                    return instance;
                }
            }
            alert("当前无法进行存档");
            return new EmptyDriver();
        })().then((res) => {
            this.driver = res;
        });
    }

    private static getRealKey(name: string) {
        return `${ TOWER_ID }_${ name }`;
    }

    /**
     * 测试功能是否正常运作
     * @param mode 
     */
    private async test(driver: StorageDriver) {

        try {
            await driver.ready();
            const testKey = LargeFileStorage.getRealKey("__test__");
            const testData = "HTML5 canvas制作的魔塔样板，支持全平台游戏！ 即使完全不会编程的用户，按照模板和说明文档也能很快做出一个魔塔游戏！";
            await driver.set(testKey, testData);
            if ((await driver.get<string>(testKey)) !== testData) {
                throw new Error();
            }
            await driver.remove(testKey);
            if ((await driver.get<string>(testKey)) !== null) {
                throw new Error();
            }
            return true;
        } catch {
            return false;            
        }
    }

    async ready() {
        return this._readyPromise;
    }

    async get<T>(key: string): Promise<T | null> {
        key = LargeFileStorage.getRealKey(key);
        await this.ready();
        return this.driver.get(key);
    }

    async set<T>(key: string, value: T) {
        key = LargeFileStorage.getRealKey(key);
        await this.ready();
        return this.driver.set(key, value);
    }

    async remove(key: string) {
        key = LargeFileStorage.getRealKey(key);
        await this.ready();
        await this.driver.remove(key);
    }

    async clear() {
        await this.ready();
        await this.driver.clear();
    }

    async length() {
        await this.ready();
        return this.driver.length();
    }

    async key(index: number) {
        await this.ready();
        return this.driver.key(index);
    }

    async keys() {
        await this.ready();
        return this.driver.keys();
    }

    async iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U) {
        await this.ready();
        return this.driver.iterate(iteratee);
    }
}

export const largeFileStorage = new LargeFileStorage();