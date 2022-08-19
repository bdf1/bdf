<script lang="ts" setup>
import { ViewLayerHandler } from '@/view/view';
import { computed, ref } from 'vue';
import { chapters } from './chapters';

const { handler } = defineProps<{ handler: ViewLayerHandler<void> }>();

const selection = ref(0);
const currentChapter = computed(() => chapters[selection.value]);

const select = (index: number) => {
    selection.value = index;
};
const prev = () => {
    selection.value -= 1;
};
const next = () => {
    selection.value += 1;
};
</script>
<template>
    <modal-frame name="tutorial" title="教程" @close="handler.close()">
        <div class="outline">
            <div v-for="(chapter, index) of chapters" :key="index"
                class="item" :class="{ active: index === selection }"
                @click="select(index)"
            >{{ chapter.title }}</div>
        </div>
        <div class="content">
            <h2 class="title">{{ currentChapter.title }}</h2>
            <article v-html="currentChapter.content" />
            <div class="pagination">
                <div v-if="selection > 0" class="prev" @click="prev">
                    <a href="javascript:void 0">上一节 - {{ chapters[selection-1].title }}</a>
                </div>
                <div v-if="selection < chapters.length - 1" class="next" @click="next">
                    <a href="javascript:void 0">下一节 - {{ chapters[selection+1].title }}</a>
                </div>
            </div>
        </div>
    </modal-frame>
</template>

<style lang="less" scoped>
.modal.tutorial {
    position: absolute;
    top: 40rem;
    bottom: 40rem;
    left: 50rem;
    right: 50rem;
    background-color: #E1E1E1;

    box-shadow: 0 2rem 3rem 3rem rgba(0, 0, 0, 0.5);

    .body {
        display: flex;
    }

    .outline {
        min-width: 100rem;
        padding: 5rem;
        .item {
            text-align: center;
            margin: 5rem;
            cursor: pointer;
            &.active {
                margin-left: 8rem;
                border-right: 3rem solid #444444;
            }
        }
    }

    .content {
        padding: 5rem;
        overflow: auto;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .title {
            font-size: 20rem;
            font-weight: bold;
            margin-block-start: 0;
            margin-block-end: 0;
            margin-inline-start: 0;
            margin-inline-end: 0;
        }
        .pagination {
            margin-top: auto;
            display: flex;
            .prev, .next {
                a {
                    color: #1890ff;
                }
            }
            .prev {
                margin-left: 5rem;
                margin-right: auto;
            }
            .next {
                margin-right: 5rem;
                margin-left: auto;
            }
        }
    }
}
</style>