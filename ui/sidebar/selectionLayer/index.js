import { extendUI } from "../../index.js";
import { PlayerIcon } from "../../components/PlayerIcon/index.js";
import { createStore } from "../../store/index.js";

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
    data: () => createStore("selection", {
        selection: "",
        playername: "",
    }, (data) => {
        data.selection = flags.selection || "";
        if (data.selection) {
            data.playername = flags.gj[data.selection].nm;
        }
    }),
    created() {
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
