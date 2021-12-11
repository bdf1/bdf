import { WIcon } from "../../components/Icon/index.js";
import { UnitIcon } from "../../components/UnitIcon/index.js";
import { extendUI } from "../../index.js";
import { CityMark } from "./CityMark.js";


const CityMarks = {};

export const CityItem = Vue.extend({
    template: /* HTML */`
    <div class="city-item" @click="gotoDetail">
        <div class="base-info">
            <city-mark :level="cityLevel"/>
            <div class="name">{{ name }}</div>
        </div>
        <div class="stat">
            <div class="data"><w-icon icon="factory-xs"/>{{ IC }}</div>
            <div class="data"><w-icon icon="physics-xs"/>{{ RD }}</div>
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
        <div v-else class="empty" @click="openConstruction">
            <w-icon class="blink warning" icon="warning" />空闲中
        </div>
    </div>
    `,
    props: {
        id: Number,
        name: String,
        hpmax: Number,
        hp: Number,
        IC: Number,
        RD: Number,
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
            extendUI.execCommand("sidebar/goto", { link: "CityDetail", params: {
                id: this.id,
            } });
        },
        openConstruction() {
            extendUI.callModal("construction", {
                id: this.id
            });
        }
    },
    components: {
        UnitIcon,
        WIcon,
        CityMark,
    }
});
