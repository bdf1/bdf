export const PlayerIcon = Vue.extend({
    template: /* HTML */`
    <div class="player-icon icon" :style="{ backgroundColor: color }">
        <span class="nickname">{{ nickname }}</span>
    </div>
    `,
    props: {
        player: Number,
    },
    computed: {
        color() {
            return flags.color[this.player];
        },
        nickname() {
            return flags.nickname[this.player];
        },
    },
});
