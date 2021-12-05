import { WIcon } from "../../components/Icon/index.js";
import { UnitIcon } from "../../components/UnitIcon/index.js";
import { extendUI } from "../../index.js";


const CityMarks = {};
// core.clearMap(ctx1);
// core.fillCircle(ctx1, 16, 16, 6, "#000")
// core.strokeCircle(ctx1, 16, 16, 9, "#000", 1);
// core.strokeCircle(ctx1, 16, 16, 13, "#000", 1);
// core.clearMap(ctx2);
// core.strokeCircle(ctx2, 16, 16, 5, "#000", 1);
// core.strokeCircle(ctx2, 16, 16, 9, "#000", 1);
// core.clearMap(ctx3);
// core.fillCircle(ctx3, 16, 16, 4, "#000", 1);
// core.strokeCircle(ctx3, 16, 16, 8, "#000", 1);
// core.clearMap(ctx4);
// core.strokeCircle(ctx4, 16, 16, 6, "#000", 1);

export const CityItem = Vue.extend({
    template: /* HTML */`
    <div class="city-item" @click="gotoDetail">
        <div class="base-info">
            <div class="city-mark">
                <img :src="cityMark" />
            </div>
            <div class="name">{{ name }}</div>
        </div>
        <div class="stat">
            <div class="data"><w-icon icon="factory-xs"/>{{ ic }}</div>
            <div class="data"><w-icon icon="physics-xs"/>{{ research }}</div>
            <div class="data"><w-icon icon="staff"/>{{ population }}+{{ populationIncrease }}</div>
        </div>
        <div class="construction" v-if="head">
            <unit-icon :unit="head.type" :level="head.level" />
            <div class="process-label">
                <unit-icon v-if= next :unit="next.type" :level="next.level"></unit-icon>
                <div class="value">{{ head.pass }}/{{ head.total }}</div>
            </div>
            <div class="process-bar">
                <div class="pass" :style="headBarStyle"></div>
            </div>
        </div>
        <div v-else class="empty">
            <w-icon class="blink warning" icon="warning" />空闲中
        </div>
    </div>
    `,
    props: {
        id: Number,
        name: String,
        hpmax: Number,
        hp: Number,
        ic: Number,
        research: Number,
        army: Array,
        enemy: Array,
        population: Number,
        populationIncrease: Number,
        constructionQueue: Array,
    },
    computed: {
        barStyle() {
            let ratio = 0;
            if (this.hpmax > 0) {
                ratio = this.hp / this.hpmax * 100;
            }
            return `width: ${ ratio.toFixed(3) }%;`;
        },
        headBarStyle() {
            if (!this.head) return "";
            let ratio = 0;
            if (this.head.total > 0) {
                ratio = this.head.pass / this.head.total * 100;
            }
            return `width: ${ ratio.toFixed(3) }%;`;
        },
        cityLevel() {
            if (this.hpmax === 30000) return 4;
            if (this.hpmax === 20000) return 3;
            if (this.hpmax === 10000) return 2;
            if (this.hpmax === 5000 ) return 1;
        },
        cityMark() {
            return CityMarks[this.cityLevel];
        },
        head() {
            if (this.constructionQueue.length === 0) return null;
            return this.getConstructionInfo(this.constructionQueue[0]);
        },
        next() {
            if (this.constructionQueue.length < 2) return null;
            return this.getConstructionInfo(this.constructionQueue[1]);
        },
    },
    methods: {
        getConstructionInfo({ lx, xh, ys }) {
            const proto = flags.mil[lx][xh];
            const total = proto.xh;
            const _pass = ys;
            const pass = Math.min(proto.xh, ys);
            const overflow = Math.max(0, _pass - total);
            return {
                type: lx, level: xh, total, pass, overflow
            };
        },
        gotoDetail() {
            extendUI.execCommand("sidebar/goto", { link: "cityDetail", params: {
                id: this.city.id,
            } });
        }
    },
    components: {
        UnitIcon,
        WIcon,
    }
});
