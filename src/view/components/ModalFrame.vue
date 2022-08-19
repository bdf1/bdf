<script lang="ts" setup>

defineProps<{ name: string, title: string }>();

const emit = defineEmits([ "close" ]);

const close = () => {
    emit("close");
}
</script>
<template>
    <div class="modal-mask">
        <div class="modal" :class="name">
            <div class="titlebar">
                <div class="title">{{ title }}</div>
                <div class="close" @click="close">×</div>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.modal-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 512;

    font-size: 14rem;

    .titlebar {
        position: absolute;
        top: 0;
        width: 100%;
        height: 26rem;

        display: flex;
        align-items: center;
        .title {
            margin-left: auto;
            user-select: none;
        }
        .close {
            margin-left: auto;

            cursor: pointer;
            width: 36rem;
            font-size: 20rem;
            text-align: center;
            &:hover {
                background-color: red;
            }      
        }
    }
    
    .body {
        position: absolute;
        top: 26rem;
        width: 100%;
        bottom: 0;
    }
}
</style>
