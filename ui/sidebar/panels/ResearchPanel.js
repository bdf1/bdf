import { extendUI } from "../../index.js";
import { WIcon } from "../../components/Icon/index.js";
import { UnitIcon } from "../../components/UnitIcon/index.js";

export const ResearchPanel = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-item research" @click="openScienceDialog">
        <div v-if="name">
            <unit-icon unit="5" level="1" />
            <div class="process">
                <div class="process-label">
                    <div class="name">{{ name }}</div>
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

        })
    },
    methods: {
        openScienceDialog() {

        },
    },
    components: {
        UnitIcon,
        WIcon,
    }
});
