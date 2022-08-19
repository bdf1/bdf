import { viewManager } from '@/view/view';
import Save from './Save.vue';
import Load from './Load.vue';

/**
 * 显示存档界面
 * @returns 
 */
export const showSave = async function() {
    return await viewManager.push(Save);
}

/**
 * 显示读档界面
 * @returns 读取的存档数据，null代表取消
 */
export const showLoad = async function() {
    return await viewManager.push<string | null>(Load);
}
