/**
 * 返回光标的抽象逻辑
 */

import { KeyCode } from "@/utils/keycode";
import { noop } from "lodash-es";
import { computed, readonly, ref } from "vue";
import { KeyBinding, Keyboard } from "../keyboard";

export namespace ListSelector {

    interface ModelOption {
        initPosition: number,
        bordered: boolean,
        onMoveFailed: (nowpos: number) => any,
    }
    
    const defaultModelOption: ModelOption = {
        initPosition: 0,
        bordered: false,
        onMoveFailed: noop,
    }
    
    export class Model {
    
        private readonly _position = ref(0);
        private bordered: boolean;
        private onMoveFailed: (nowpos: number) => any;
        private readonly size;
    
        readonly position = readonly(this._position);
    
        constructor(size: number, options: Partial<ModelOption> = {}) {
            const { initPosition, bordered, onMoveFailed } = {
                ...defaultModelOption,
                ...options,
            };
            this._position.value = initPosition;
            this.bordered = bordered;
            this.onMoveFailed = onMoveFailed;
            this.size = size; 
        }
        
        /**
         * 移动到上一个选项
         */
        prev() {
            if (this._position.value === 0) {
                if (this.bordered) {
                    this.onMoveFailed(this._position.value);
                    return;
                }
                this._position.value = this.size - 1;
            } else {
                this._position.value--;
            }
        }
    
        /**
         * 移动到下一个选项
         */
        next() {
            if (this._position.value === this.size - 1) {
                if (this.bordered) {
                    this.onMoveFailed(this._position.value);
                    return;
                }
                this._position.value = 0;
            } else {
                this._position.value++;
            }
        }
    
        /**
         * 直接指定要选择的选项
         */
        select(position: number) {
            this._position.value = position;
        }
    }
    
    interface KeyBindingOption {
        prev: KeyBinding | KeyBinding[] | null,
        next: KeyBinding | KeyBinding[] | null,
        wrapper: (action: Keyboard.ProxyAction) => Keyboard.ProxyAction,
    }
    
    const defaultKeyBindingOption: KeyBindingOption = {
        prev: KeyCode.UpArrow,
        next: KeyCode.DownArrow,
        wrapper: (action) => action,
    }
    
    /**
     * 为选择器生成键盘绑定
     * @param selector 
     * @param options 
     * @returns 
     */
    export function createKeyBinding(model: Model, options: Partial<KeyBindingOption> = {}) {
        const { prev, next, wrapper } = {
            ...defaultKeyBindingOption,
            ...options,
        };
        const rules: Keyboard.ProxyRule[] = [];
        const attachKeyBinding = (keyBinding: KeyBinding | KeyBinding[] | null, trigger: Keyboard.ProxyAction) => {
            if (keyBinding !== null) {
                rules.push([ keyBinding, { trigger } ]);
            }
        };
        attachKeyBinding(prev, wrapper(() => model.prev()));
        attachKeyBinding(next, wrapper(() => model.next()));
        return rules;
    }
}

export namespace ChapteredListSelector {

    export interface ModelOption {
        initPosition: number,
        initChapterIndex: number,
        bordered: boolean,
        onMoveFailed: (nowpos: number) => any,
    }
    
    const defaultModelOption: ModelOption = {
        initPosition: 0,
        initChapterIndex: 0,
        bordered: true,
        onMoveFailed: noop,
    }
    
    export class Model {
    
        private readonly _position = ref(0);
        private readonly _chapterIndex = ref(0);
        private bordered: boolean;
        private onMoveFailed: (nowpos: number) => any;
        private chapterMap: number[][];
    
        readonly position = readonly(this._position);
        readonly chapterIndex = readonly(this._chapterIndex);
        readonly rawPosition = computed(() => {
            return this.chapterMap[this.chapterIndex.value][this.position.value];
        });
    
        constructor(chapters: number[], options: Partial<ModelOption> = {}) {
            const { initPosition, initChapterIndex, bordered, onMoveFailed } = {
                ...defaultModelOption,
                ...options,
            };
            let index = 0;
            this.chapterMap = chapters.map((e) => {
                const map = [];
                for (let i = 0; i < e; i++) {
                    map.push(index + i);
                }
                index += e;
                return map;
            });
            this._position.value = initPosition;
            this._chapterIndex.value = initChapterIndex;
            this.bordered = bordered;
            this.onMoveFailed = onMoveFailed;
        }
    
        prev() {
            if (this.position.value === 0) {
                this.prevChapter();
            } else {
                this._position.value--;
            }
        }
    
        next() {
            if (this.position.value === this.chapterMap[this.chapterIndex.value].length-1) {
                this.nextChapter();
            } else {
                this._position.value++;
            }
        }
    
        prevChapter() {
            if (this.chapterIndex.value === 0) {
                if (this.bordered) {
                    return;
                } else {
                    this.selectChapterTail(this.chapterMap.length-1);
                }
            } else {
                this.selectChapterTail(this.chapterIndex.value-1);
            }
        }
    
        nextChapter() {
            if (this.chapterIndex.value === this.chapterMap.length-1) {
                if (this.bordered) {
                    return;
                } else {
                    this.selectChapter(0);
                }
            } else {
                this.selectChapter(this.chapterIndex.value+1);
            }
        }
    
        select(chapterIndex: number, itemIndex: number) {
            this._chapterIndex.value = chapterIndex;
            this._position.value = itemIndex;
        }
    
        selectChapter(index: number) {
            // 可以认为是选择了章节中第一个item
            this.select(index, 0);
        }
    
        selectChapterTail(index: number) {
            this.select(index, this.chapterMap[index].length-1);
        }
    }

    interface KeyBindingOption {
        prev: KeyBinding | KeyBinding[] | null,
        next: KeyBinding | KeyBinding[] | null,
        prevChapter: KeyBinding | KeyBinding[] | null,
        nextChapter: KeyBinding | KeyBinding[] | null,
        wrapper: (action: Keyboard.ProxyAction) => Keyboard.ProxyAction,
        chapterWrapper: (action: Keyboard.ProxyAction) => Keyboard.ProxyAction,
    }
    
    const defaultKeyBindingOption: KeyBindingOption = {
        prev: KeyCode.UpArrow,
        next: KeyCode.DownArrow,
        wrapper: (action) => action,
        prevChapter: KeyCode.PageUp,
        nextChapter: KeyCode.PageDown,
        chapterWrapper: (action) => action,
    }
    
    /**
     * 为选择器生成键盘绑定
     * @param selector 
     * @param options 
     * @returns 
     */
    export function createKeyBinding(model: Model, options: Partial<KeyBindingOption> = {}) {
        const {
            prev, next, wrapper,
            prevChapter, nextChapter, chapterWrapper,
        } = {
            ...defaultKeyBindingOption,
            ...options,
        };
        const rules: Keyboard.ProxyRule[] = [];
        const attachKeyBinding = (keyBinding: KeyBinding | KeyBinding[] | null, trigger: Keyboard.ProxyAction) => {
            if (keyBinding !== null) {
                rules.push([ keyBinding, { trigger } ]);
            }
        };
        attachKeyBinding(prev, wrapper(() => model.prev()));
        attachKeyBinding(next, wrapper(() => model.next()));
        attachKeyBinding(prevChapter, chapterWrapper(() => model.prevChapter()));
        attachKeyBinding(nextChapter, chapterWrapper(() => model.nextChapter()));
        return rules;
    }
}
