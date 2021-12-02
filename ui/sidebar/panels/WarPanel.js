import { PlayerIcon } from "../../components/PlayerIcon/index.js";

export const WarPanel = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-item war">
        <div v-if="enemies.length > 0" class="war-list">
            <player-icon v-for="enemy of enemies" :key="enemy" :player="enemy" />
        </div>
        <div v-else class="empty">
            当前未参战
        </div>
    </div>
    `,
    data: () => ({
        enemies: [],
    }),
    created() {
        extendUI.onUpdate(() => {
            if (!flags.xzgj) return;
            const enemies = [];
            for (let i = 1; i < flags.gj.length; i++) {
                if (flags.zz[flags.xzgj][i]) {
                    enemies.push(i);
                }
            }
            this.enemies = enemies;
        });
    },
    methods: {
        
    },
    components: {
        PlayerIcon,
    },
});
