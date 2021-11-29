import { extendUI } from "../../index.js";
import { PlayerIcon } from "../../components/PlayerIcon/index.js";

export const SelectionLayer = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-layer selection">
        <div class="sidebar-item selection-label">请选择角色</div>
        <div class="sidebar-item">
            <div v-if="selection">
                <div class="base-info">
                    <player-icon :player="selection" />
                    <div>{{ playername }}</div>
                </div>
                <div class="stat">

                </div>
            </div>
        </div>
        <div class="sidebar-item start-button"
            :class="{ disabled: selection == '' }" @click="startGame"
        >
            开始游戏
        </div>
    </div>
    `,
    data: () => ({
        selection: "",
        playername: "",
    }),
    created() {
        extendUI.onUpdate(() => {
            this.selection = flags.selection || "";
            if (this.selection) {
                this.playername = flags.gj[this.selection].nm;
            }
        });
    },
    methods: {
        startGame() {
            if (!this.selection) {
                return;
            }
            extendUI.execCommand("startGame", { player: this.selection });
        },
    },
    components: {
        PlayerIcon,
    }
});
