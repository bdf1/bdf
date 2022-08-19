import { extendUI } from "../../index.js";

export const PlayerIcon = Vue.extend({
    template: /* HTML */`
    <div class="player-icon icon" :class="{ clickable }"
        :style="{ backgroundColor: color }" @click="showPlayer">
        <span class="nickname">{{ nickname }}</span>
    </div>
    `,
    props: {
        player: Number,
        clickable: { type: Boolean, default: true }
    },
    computed: {
        color() {
            return flags.color[this.player];
        },
        nickname() {
            return flags.nickname[this.player];
        },
    },
    methods: {
        showPlayer() {
            if (!this.clickable) return;
            extendUI.execCommand("sidebar/goto", {
                link: "PlayerDetail", params: {
                    id: this.player
                }
            })
        }
    }
});
