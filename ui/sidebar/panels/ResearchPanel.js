import { extendUI } from "../../index.js";
import { WIcon } from "../../components/Icon/index.js";
import { UnitIcon } from "../../components/UnitIcon/index.js";
import { createStore } from "../../store/index.js";

export const ResearchPanel = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-item research" @click="openResearchModal">
        <div v-if="field > 0" class="container">
            <unit-icon :unit="field" :level="level+1" />
            <div class="process">
                <div class="process-label">
                    <!-- <div class="name">{{ name }}</div> -->
                    <div class="value">{{ pass }}/{{ total }}</div>
                </div>
                <div class="process-bar">
                    <div class="pass" :style="barStyle"></div>
                </div>
            </div>
        </div>
        <div v-else class="empty">
            <w-icon class="blink warning" icon="warning" />选择研究方向
        </div>
    </div>
    `,
    data: () => createStore("research-panel", {
        name: "",
        field: 0,
        level: 0,
        pass: 0,
        total: 0,
    }, (data) => {
        if (!flags.xzgj) return;
        const research = core.createResearch(flags.gj[flags.xzgj]);
        if (research.field === 0) {
            return;
        }
        data.field = research.field;
        const field = research.fields[data.field];
        data.pass = field.pass;
        data.level = field.level;
        data.total = field.levels[data.level+1];
        data.name = flags.mil[data.field][data.level+1].nm;
    }),
    computed: {
        barStyle() {
            let ratio = 0;
            if (this.total > 0) {
                ratio = this.pass / this.total * 100;
            }
            return `width: ${ ratio.toFixed(3) }%;`;
        }
    },
    created() {
    },
    methods: {
        openResearchModal() {
            extendUI.callModal("research");
        },
    },
    components: {
        UnitIcon,
        WIcon,
    }
});
