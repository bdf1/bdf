import { viewManager } from '@/view/view';
import Title from './Index.vue';

export enum TitleOperator {
    START_NEW,
    START_FROM_SAVE,
    START_FROM_REPLAY,
}

export type TitleAction = 
    [ op: TitleOperator.START_NEW, hard: string ] |
    [ op: TitleOperator.START_FROM_SAVE, saveData: any ] |
    [ op: TitleOperator.START_FROM_REPLAY, replayData: any ];

/**
 * 显示开始界面
 * @returns 
 */
export const showTitle = function() {
    return viewManager.push<TitleAction>(Title);
}
