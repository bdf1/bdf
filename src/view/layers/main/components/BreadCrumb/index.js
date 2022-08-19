import { extendUI } from "../../index.js";

export const BreadCrumb = Vue.extend({
    template: /* HTML */`
    <div class="bread-crumb">
        <div v-for="node of path" :key="node[0]">
            <span @click="moveTo(node[0])" class="link">{{ node[1] }}</span>/
        </div>
        {{ now }}
    </div>
    `,
    props: {
        path: Array,
        now: String,
    },
    methods: {
        moveTo(link) {
            extendUI.execCommand("sidebar/goto", { link });
        }
    }
});