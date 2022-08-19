<script lang="ts" setup>
import { sleep } from '@/utils/common';
import { KeyCode } from '@/utils/keycode';
import { ChapteredListSelector } from '@/view/base/selector';
import { Keyboard, keyboardManager } from '@/view/keyboard';
import { CloseHandler } from '@/view/view';
import { defer } from 'lodash-es';
import { onMounted, ref, watch } from 'vue';
import { computed } from 'vue';
import { chapters } from './chapters';

const { close } = defineProps<{ close: CloseHandler<void> }>();

const selector = new ChapteredListSelector.Model(chapters.map(e => e[1].length), { bordered: true });

const kbpHandler = keyboardManager.push(
    new Keyboard.Proxy([
        [ KeyCode.Escape, { finish: () => { close() } }],
        ...ChapteredListSelector.createKeyBinding(selector, {
            wrapper: (action) => Keyboard.throttleLongPress(action, 100),
            chapterWrapper: (action) => Keyboard.throttleLongPress(action, 100),
        }),
        [ [ KeyCode.Enter, KeyCode.Space ], {
            trigger: () => {
                // foucsPanel();
            }
        } ],
    ])
);

watch(selector.position, (value) => {
    console.log(value);
})

const active = ref(false);

onMounted(() => {
    defer(() => {
        active.value = true;
    });
});

const isFocused = (chapterIndex: number, index: number) => {
    return selector.chapterIndex.value === chapterIndex
        && selector.position.value === index
}

close.onBefore(async () => {
    active.value = false;
    await sleep(300);
    keyboardManager.pop(kbpHandler);
});
</script>
<template>
    <div class="container" :class="{ active }">
        <div class="toc">
            
        </div>
        <div class="main-view">
            <div class="chapter" v-for="(chapter, chapterIndex) of chapters" :key="chapterIndex">
                <div class="chapter-title">{{ chapter[0] }}</div>
                <div class="chapter-divider"></div>
                <div class="item" v-for="(item, index) of chapter[1]" :key="index"
                    @click="selector.select(chapterIndex, index)"
                >
                    <div class="item-label" :class="{
                        focused: isFocused(chapterIndex, index)
                    }">{{ item[0] }}</div>
                    <component class="item-main"
                        :is="item[1]" :focused="isFocused(chapterIndex, index)"
                    ></component>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
    opacity: 0;
    transition:
        opacity 300ms,
        backdrop-filter 300ms,
        background-color 300ms;
    &.active {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(5rem);
    }
}
.toc {
    position: absolute;
    left: 10rem;
}
.main-view {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
}
.chapter {
    margin-left: 100rem;
    margin-bottom: 10rem;
    width: 480rem;
}
.chapter-title {
    font-size: 24rem;
    color: #DDDDDD;
}
.chapter-divider {

}
.item {
    margin-left: 5rem;
    display: flex;
}
.item-label {
    font-size: 16rem;
    color: #CCCCCC;
    &.focused {
        color: #FFFFFF;
    }
}
.item-main {
    margin: auto;
}
</style>