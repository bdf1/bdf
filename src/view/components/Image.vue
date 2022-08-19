<script lang="ts" setup>
import { core } from '@/core/core';

const { src } = defineProps<{ src: string }>();
</script>
<template>
    <img :src="core.material.images.images[src].src"/>
</template>
<style>
</style>