<script lang="ts" setup>
import { CloseHandler } from '@/view/view';
import { defer } from 'lodash-es';
import { onMounted, ref } from 'vue';

const { close } = defineProps<{ close: CloseHandler<void> }>();

const active = ref(false);

onMounted(() => {
    defer(() => {
        active.value = true;
    });
});

</script>
<template>
    <div class="container" :class="{ active }">
        
    </div>
</template>
<style lang="less" scoped>
.container {
    opacity: 0;
    transition:
        opacity 300ms,
        backdrop-filter 300ms,
        background-color 300ms;
        background-color: rgba(0, 0, 0, 0.35);
    &.active {
        opacity: 1;
        backdrop-filter: blur(5rem);
    }
}
</style>