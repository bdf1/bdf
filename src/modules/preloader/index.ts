import { ref } from "vue";

export type ProgressHandler = (loaded: number, total: number) => void;

export type LoadingTask = (progress: ProgressHandler, finish: () => void) => void;

class Preloader {
    /**
     * 已加载的资源量
     */
    loaded = ref(0);

    /**
     * 需要加载的全部资源量
     */
    total = ref(0);

    private tasks: Promise<void>[] = [];

    addTask(taskConstructor: LoadingTask) {
        let prevLoaded = 0, prevTotal = 0;
        const task = new Promise<void>((res) => {
            taskConstructor(
                (loaded, total) => {
                    this.loaded.value += (loaded - prevLoaded);
                    this.total.value += (total - prevTotal);
                    prevLoaded = loaded;
                    prevTotal = total;
                },
                () => res(),
            );
        });
        this.tasks.push(task);
        return task;
    }

    private completeHandler?: () => void;
    private completePromise = new Promise<void>((res) => {
        this.completeHandler = res;
    });

    /**
     * 
     */
    async finalize() {
        console.log(`[preloader] finalized, task count = ${ this.tasks.length}`);
        Promise.all(this.tasks).then(() => {
            console.log(`[preloader] complete`);
            this.completeHandler!();
        })
        return this.complete();
    }

    /**
     * 
     */
    complete() {
        return this.completePromise;
    }    
}

export const preloader = new Preloader();
