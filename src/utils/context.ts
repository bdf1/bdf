export class HookContext {

    private valueStack: any[] = [];
    private pointer = 0;

    reset() {
        this.pointer = 0;
    }

    use<T>(initValue: T): [ T, (value: T) => void ] {
        const currentPointer = this.pointer++;
        if (this.valueStack.length === currentPointer) {
            this.valueStack.push(initValue)
        } else if (this.valueStack.length < currentPointer) {
            throw new Error();
        }
        return [
            this.valueStack[currentPointer],
            (value: T) => this.valueStack[currentPointer] = value
        ];
    }
}

export interface HookContextProxy {
    use<T>(initValue: T): [ T, (value: T) => void ];
}
