import { EventHook } from "@/utils/eventHook";
import { attachCSS } from "./common";

/**
 * 对背景图层应用模糊滤镜
 * @todo 安全检查，开始与结束模糊应该只能各调用一次
 * @param time 动画时间
 * @param radius 滤镜的大小，单位为rem 
 * @returns 
 */
export function useBlurBackground(time: number, radius: number) {
    const removeBaseCSS = attachCSS(/* CSS */`
        .game > .layer:not(:last-child) {
            transition: filter ${ time }ms;
        }
    `);
    const hook = new EventHook();
    /**
     * 开始模糊
     * @returns 
     */
    const blurStart = () => {
        const removeCSS = attachCSS(/* CSS */`
            .game > .layer:not(:last-child) {
                filter: blur(${ radius }rem);
            }
        `);
        hook.tap(removeCSS);
    }
    const blurEnd = () => {
        hook.call();
        // 动画结束后移除渐变属性
        setTimeout(() => {
            removeBaseCSS();
        }, time + 100);
    }
    return {
        blurStart, blurEnd
    };
}
