import { extendUI } from "../index.js";
import { SelectionLayer } from "./selectionLayer/index.js";
import { BattlePanel } from "./panels/BattlePanel.js";
import { CityPanel } from "./panels/CityPanel.js";
import { MisslePanel } from "./panels/MisslePanel.js";
import { NextButton } from "./panels/NextButton.js";
import { ResearchPanel } from "./panels/ResearchPanel.js";
import { WarPanel } from "./panels/WarPanel.js";


export const Sidebar = Vue.extend({
    template: /* HTML */`
    <div v-if="store.serve" v-show="show" class="sidebar" :class="{ lockControl }">
        <selection-layer v-if="onSelection" />
        <div v-else class="sidebar-layer normal">
            <war-panel />
            <research-panel />
            <city-panel />
            <battle-panel />
            <missle-panel />
            <next-button />
        </div>
    </div>
    `,
    data: () => ({
        show: false,
        store: extendUI.store,
        lockControl: false,
        onSelection: false,
    }),
    created() {
        extendUI.onUpdate(() => {
            this.show = core.domStyle.showStatusBar;
            this.lockControl = core.status.lockControl;
            if (!flags.xzgj) {
                this.onSelection = true;
                return;
            }
            this.onSelection = false;
        });
    },
    components: {
        SelectionLayer,
        WarPanel,
        ResearchPanel,
        CityPanel,
        BattlePanel,
        MisslePanel,
        NextButton,
    }
});
