import { DriverType, StorageDriver } from "../storage";

export class EmptyDriver implements StorageDriver {
    id = DriverType.Empty;

    async ready(): Promise<void> {
        
    }

    async get() {
        return null;
    }

    async set<T>(key: string, value: T) {
        return value;
    }

    async remove(key: string) {

    }

    async clear() {

    }

    async length() {
        return 0;
    }

    async key(index: number) {
        return "";
    }

    async keys() {
        return [] as string[];
    }
    async iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U): Promise<U | undefined> {
        return void 0;
    };
}
