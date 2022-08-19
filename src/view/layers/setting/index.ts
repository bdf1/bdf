import { viewManager } from '@/view/view';
import Setting from './Index.vue';

export const showSetting = async function() {
    await viewManager.push(Setting);
}
