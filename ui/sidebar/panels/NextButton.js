import { extendUI } from "../../index.js";

export const NextButton = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-item next-turn" @click="nextTurn">
        下一回合
    </div>
    `,
    methods: {
        nextTurn() {
            extendUI.execCommand("nextTurn");
        }
    },
});
