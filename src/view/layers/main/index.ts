import { viewManager } from '@/view/view';
import Main from './Index.vue';

export const showMain = function() {
    return viewManager.push(Main);
}
