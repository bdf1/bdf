import { extendUI } from "../../index.js";
import { WIcon } from "../../components/Icon/index.js";
import { UnitIcon } from "../../components/UnitIcon/index.js";

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
    data: () => ({
        name: "",
        field: 0,
        level: 0,
        pass: 0,
        total: 0,
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
        extendUI.onUpdate(() => {
            if (!flags.xzgj) return;
            const research = flags.gj[flags.xzgj].research;
            if (research.field === 0) {
                return;
            }
            this.field = research.field;
            const field = research.fields[this.field];
            this.pass = field.pass;
            this.level = field.level;
            this.total = field.levels[this.level+1];
            this.name = flags.mil[this.field][this.level+1].nm;
        })
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
