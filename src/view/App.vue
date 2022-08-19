<script lang="ts" setup>
import { VIEW_WIDTH, VIEW_HEIGHT } from '@/constant';
import { viewManager } from './view';

const STYLE = {
    width: VIEW_WIDTH + 'rem', height: VIEW_HEIGHT + 'rem'
};
</script>
<template>
    <div class="game" :style="STYLE">
        <template v-for="([layer, handler]) of viewManager.stack">
            <component class="layer" :is="layer" :handler="handler" />
        </template>
    </div>
</template>

<style>
#app {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<style lang="less" scoped>
.game {
    position: relative;
    overflow: hidden;
    user-select: none;
}
.layer {
    position: absolute;
    width: 100%;
    height: 100%;

    overflow: hidden;
}
</style>
