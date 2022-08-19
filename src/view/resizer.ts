import { computed, readonly, ref, watch } from "vue";
import { VIEW_WIDTH, VIEW_HEIGHT } from "@/constant";
import { memoize } from "lodash-es";

export const useResizer = memoize(() => {

    const maxVaildRatio = ref(1);
    
    const expectRatio = ref(1);

    const realRatio = computed(() => Math.min(expectRatio.value, maxVaildRatio.value));

    const setExpectRatio = (ratio: number) => {
        expectRatio.value = ratio;
    }

    const root = document.documentElement;
    /**
     * 计算可选缩放比例，并进行画面缩放
     */
    const update = () => {
        maxVaildRatio.value = Math.min(
            root.clientWidth  / VIEW_WIDTH,
            root.clientHeight / VIEW_HEIGHT
        );
        requestAnimationFrame(() => {
            root.style.fontSize = realRatio + 'px';
        });
    }
    window.addEventListener("resize", update);
    watch(expectRatio, update);
    update();

    return {
        /**
         * 当前的实际缩放比例(只读) 
         */
        realRatio: realRatio,
        /**
         * 获取窗口允许的最大缩放比例的只读代理 
         */
        maxVaildRatio: readonly(maxVaildRatio),
        /**
         * 获取用户设置的最大缩放比例的只读代理 
         */
        expectRatio: readonly(expectRatio),
        /**
         * 设置最大缩放比例
         */
        setExpectRatio,
    }
});
