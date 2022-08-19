import Vue from "vue";
import App from "@/view/App.vue";
import { core } from '@/core';
import { useResizer } from '@/view/resizer';
import { showMain } from '@/view/layers/main';
import { showLoading } from '@/view/layers/loading';
import { showTitle, TitleOperator } from '@/view/layers/title';

export const bootstrap = async () => {
    new Vue({
        render: (h) => h(App)
    }).$mount('#app');
    if (import.meta.env.DEV) {
        // @ts-ignore
        window.core = core;
    }
    useResizer();
    const loadingViewHandler = showLoading();
    await core.load();
    core.init();
    loadingViewHandler.close();
    // 游戏逻辑主循环
    while (true) {
        const titleViewHandler = showTitle();
        const [ op, payload ] = await titleViewHandler.waitClose();
        if (op === TitleOperator.START_NEW) {
            core.startNewGame(payload);
        } else if (op === TitleOperator.START_FROM_SAVE) {

        } else if (op === TitleOperator.START_FROM_REPLAY) {
            const { hard, seed, route } = payload;
            core.startFromReplay(hard, seed, route);
        } else {
            throw new Error();
        }
        showMain();
        await core.waitExit();
    }
};