

export class EventHook<T extends any[] = [], R = any> {
    
    private taped: ((...args: T) => any)[] = [];
    
    tap(action: (...args: T) => any) {
        this.taped.push(action);        
    }

    call(...args: T): R[] {
        return this.taped.map((action) => {
            return action(...args);
        })
    }
}