import localforage from "localforage";
import LZString from "lz-string";
import { DriverType, StorageDriver } from "../storage";

export class LocalforageDriver implements StorageDriver {
    id = DriverType.Localforage;

    compress(data: string): string {
        return LZString.compressToUTF16(data);
    }

    decompress(data: string): string | null {
        return LZString.decompressFromUTF16(data);
    }

    async ready() {
        return localforage.ready();
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await localforage.getItem<string>(key);
        if (data === null) return null;
        try {
            const rawdata = this.decompress(data);
            if (rawdata === null) throw new Error();
            return JSON.parse(rawdata);
        } catch {
            return null;
        }
    }

    async set<T>(key: string, value: T) {
        const rawdata = JSON.stringify(value);
        const data = this.compress(rawdata);
        await localforage.setItem(key, data);
        return value;
    }

    async remove(key: string) {
        await localforage.removeItem(key);
    }

    async clear() {
        await localforage.clear();
    }
    
    async length(): Promise<number> {
        return localforage.length();
    }

    async key(keyIndex: number): Promise<string> {
        return localforage.key(keyIndex);
    }

    async keys() {
        return localforage.keys();
    }

    async iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U) {
        return localforage.iterate(iteratee);
    }
}
