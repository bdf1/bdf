<script lang="ts" setup>
import { filePicker } from '@/modules/client/filePicker';
import { KeyCode } from '@/utils/keycode';
import { ListSelector } from '@/view/base/selector';
import { Keyboard, keyboardManager } from '@/view/keyboard';
import { ViewLayerHandler } from '@/view/view';
import { TitleAction, TitleOperator } from '.';
import { showSetting } from '../setting';
// import { SettingFilled } from '@ant-design/icons-vue';
import Image from '@/view/components/Image.vue';
import { showLoad } from '../save';

const { handler } = defineProps<{ handler: ViewLayerHandler<TitleAction> }>();

const selections: [ string, () => any ][] = [
    [ "开始游戏", () => {
        handler.close([ TitleOperator.START_NEW , ""]);
    } ],
    [ "读取存档", async () => {
        const save = await showLoad();
        if (save === null) return;
        handler.close([ TitleOperator.START_FROM_SAVE, "" ]);
    } ],
    [ "录像回放", async () => {
        try {
            const route = await filePicker.readText(".h5route");
            /**
             * @todo 解码route
             */
            handler.close([ TitleOperator.START_FROM_REPLAY , route]);
        } catch {

        }
    } ],
];
const selector = new ListSelector.Model(selections.length);

const kbpHandler = keyboardManager.push(
    new Keyboard.Proxy([
        ...ListSelector.createKeyBinding(selector, {
            wrapper: (action) => Keyboard.throttleLongPress(action, 100),
        }),
        [ [ KeyCode.Enter, KeyCode.Space ], {
            trigger: () => {
                selections[selector.position.value][1]();
            }
        } ],
    ])
);

handler.beforeClose(() => {
    keyboardManager.pop(kbpHandler);
});
</script>
<template>
    <div class="container">
        <Image class="cover" src="bg.jpg"/>
        <div class="select">
            <template v-for="(selection, index) of selections" :key="index">
                <div class="selection"
                    :class="{ active: selector.position.value === index }"
                    @click="() => { selector.select(index); selection[1](); }"
                >
                    {{ selection[0] }}
                </div>
            </template>
        </div>
        <div class="setting-button" @click="showSetting">
            <!-- <SettingFilled /> -->
        </div>
    </div>
</template>

<style lang="less" scoped>
.cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.select {
    position: absolute;
    right: 0;
    top: 240rem;
}
.selection {
    margin: 0 10rem;
    padding: 0 10rem;
    font-size: 18rem;

    color: white;
    opacity: 0.8;
    cursor: pointer;
    &.active {
        opacity: 1;
    }
    &:hover {
        opacity: 0.9;
    }
}
.setting-button {
    position: absolute;
    right: 5rem;
    bottom: 2rem;
    
    font-size: 16rem;
    color: white;

    opacity: 0.8;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
}
</style>