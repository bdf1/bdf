import { ref, Ref } from "vue";
import { TOWER_ID } from "@/constant";

export class Config<T extends Record<string, any>> { 

    private defaultValue: T;
    private cache: Partial<{ [ K in keyof T ]: Ref<T[K]> }>;
    private readonly prefix: string;

    constructor(prefix: string, defaultValue: T) {
        this.prefix = prefix;
        this.defaultValue = defaultValue;
        this.cache = {};
    }

    private getRealName(name: string) {
        return `${ TOWER_ID }_${ this.prefix }.${ name }`;
    }

    getRef<K extends Extract<keyof T, string>>(name: K): Ref<T[K]> {
        if (!(name in this.cache)) {
            const value = localStorage.getItem(this.getRealName(name));
            if (value === null) {
                this.cache[name] = ref(this.defaultValue[name]);
            } else {
                this.cache[name] = ref(JSON.parse(value) as T[K]);
            }
        }
        return this.cache[name] as Ref<T[K]>;
    }

    set<K extends Extract<keyof T, string>>(name: K, value: T[K]) {
        this.getRef(name).value = value;
        localStorage.setItem(this.getRealName(name), JSON.stringify(value));
    }
    
    get<K extends Extract<keyof T, string>>(name: K): T[K] {
        return this.getRef(name).value;
    }
}
