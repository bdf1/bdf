<script lang="ts" setup>
import { sePlayer } from '@/modules/audio/se';
import { KeyCode } from '@/utils/keycode';
import { TEST_SE } from '@/view/audiomap';
import { Keyboard, keyboardManager } from '@/view/keyboard';
import { SoundFilled } from '@ant-design/icons-vue';
import { defer } from 'lodash-es';
import { computed, Ref, unref, watch } from 'vue';

const props = defineProps<{
    focused: boolean,
    player: {
        getMutedRef: () => Ref<boolean>,
        setMuted: (muted: boolean) => void,
        getVolumeRef: () => Ref<number>,
        setVolume: (volume: number) => void,
    }
}>();

const player = props.player;

/**
 * @todo 配置可以节流写入本地
 */
const muted = player.getMutedRef();
const volume = player.getVolumeRef();

function setVolume(volume: number | Ref<number>) {
    const value = unref(volume);
    player.setVolume(value);
    if (value === 0) {
        if (muted.value === false) {
            player.setMuted(true);
        }
    } else {
        if (muted.value === true) {
            player.setMuted(false);
        }
    }
}

/** 播放测试音效以确认音量 */
const testVolume = () => {
    sePlayer.play(TEST_SE);
}

const kbp = new Keyboard.Proxy([
    [ KeyCode.LeftArrow, {
        trigger: Keyboard.throttleLongPress(() => {
            setVolume(volume.value - 10);
        }, 100),
        finish: testVolume,
    }, ],
    [ KeyCode.RightArrow, {
        trigger: Keyboard.throttleLongPress(() => {
            setVolume(volume.value + 10);
        }, 100),
        finish: testVolume,
    }, ],
]);

let id = -1;
const foucsed = computed(() => props.focused);
watch(foucsed, (nowFocused) => {
    if (nowFocused) {
        // 考虑到每个item都会监听focus，无法保证调用顺序，因此defer执行挂载键盘代理
        defer(() => id = keyboardManager.extend(kbp));
    } else {
        if (id !== -1) {
            keyboardManager.pop(id);
            id--;
        }
    }
}, { immediate: true });
</script>
<template>
    <div class="audio-controller" :class="{ focused }">
        <div class="mute-button">
            <SoundFilled class="mute-icon" :class="{ muted }" />
        </div>
        <div class="volume-bar">
            <template v-for="i of 10" :key="i">
                <div class="block" :class="{
                    active: muted, has: (i * 10) <= volume
                }" @click="setVolume(i * 10)">
                    <div class="bar-item"></div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.audio-controller {
    display: flex;
}
.mute-icon {
    &.muted {
        color: #888888;
    }
}
.volume-bar {
    display: flex;
}
.block {
    cursor: pointer;
    display: flex;
    margin: 0 1rem;
    &.has {
        .bar-item {
            background-color: #CEBB3D;
        }
        &.active {
            
        }
    }
    .bar-item {
        margin: auto 0;
        height: 6rem;
        width: 30rem;
        background-color: #333333;
    }
}
.focused .block {
    &.has {
        .bar-item {
            background-color: #FCE547;
        }
    }
}
</style>