import { extendUI } from "../index.js";
import { SelectionLayer } from "./selectionLayer/index.js";
import { BattlePanel } from "./panels/BattlePanel.js";
import { CityPanel } from "./panels/CityPanel.js";
import { MisslePanel } from "./panels/MisslePanel.js";
import { NextButton } from "./panels/NextButton.js";
import { ResearchPanel } from "./panels/ResearchPanel.js";
import { WarPanel } from "./panels/WarPanel.js";
import { CityList } from "./cityLayer/CityList.js";
import { CityDetail } from "./cityLayer/CityDetail.js";
import { createStore } from "../store/index.js";
import { NativeIcon } from "../components/NativeIcon/index.js";

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
            <component v-if="store.link" :is="store.link"></component>
        </div>
    </div>
    `,
    data: () => createStore("sidebar", {
        show: false,
        store: extendUI.store,
        lockControl: false,
        onSelection: false,
    }, (data) => {
        data.show = core.domStyle.showStatusBar;
        data.lockControl = core.status.lockControl;
        if (!flags.xzgj) {
            data.onSelection = true;
            return;
        }
        data.onSelection = false;
    }),
    created() {
        extendUI.registerCommand("sidebar/goto", ({ link, params }) => {
            extendUI.store.link = link;
            extendUI.store.params = params;
            extendUI.update();
        })
    },
    components: {
        SelectionLayer,
        WarPanel,
        ResearchPanel,
        CityPanel,
        BattlePanel,
        MisslePanel,
        NextButton,

        CityList,
        CityDetail
    }
});