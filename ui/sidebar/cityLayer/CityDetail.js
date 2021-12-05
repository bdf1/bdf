import { BreadCrumb } from "../../components/BreadCrumb/index.js";
import { extendUI } from "../../index.js";
import { createStore } from "../../store/index.js";
import { CityMark } from "./CityMark.js";

export const CityDetail = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-layer city-detail">
        <bread-crumb :path="[['', '主界面'],['CityList', '城市列表']]" now="城市详情"/>
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
        <div v-else class="empty">
            <w-icon class="blink warning" icon="warning" />空闲中
        </div>
    </div>
    `,
    data: () => {
        const id = extendUI.store.params.id;
        if (!id) return {};
        const city = flags.cs[id];
        return {
            id,
            name: city.nm,
            hpmax: city.HP,
            hp: city.hp,
            IC: city.ic,
            RD: city.kj,
            population: city.rk,
            populationIncrease: city.rkzz,
            constructionQueue: core.clone(city.sc),
        }
    },
    computed: {
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
        openConstruction() {
            
        }
    },
    components: {
        BreadCrumb,
        CityMark,
    },
});
