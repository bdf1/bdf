import { isBoolean, isNumber } from "lodash-es";

export class Assert {
    static isNumber(value: any): number {
        if (!isNumber(value)) {
            console.error(value, "is not a number");
        }
        return value;
    }

    static isBoolean(value: any): boolean {
        if (!isBoolean(value)) {
            console.error(value, "is not a boolean");
        }
        return value;
    }
}