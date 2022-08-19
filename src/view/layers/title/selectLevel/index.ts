import { viewManager } from '@/view/view';
import SelectLevel from './Index.vue';

/**
 * 显示难度选择界面
 * @returns 
 */
export const showSelectLevel = async function() {
    return await viewManager.push<string>(SelectLevel);
}
