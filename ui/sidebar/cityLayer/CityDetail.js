import { BreadCrumb } from "../../components/BreadCrumb/index.js";
import { WIcon } from "../../components/Icon/index.js";
import { PlayerIcon } from "../../components/PlayerIcon/index.js";
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
        <template v-if="isown">
            <div class="construction" v-else-if="head" @click="openConstruction">
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
            <div class="army"></div>
        </template>
        <template v-else> 
            <div class="owner">
                <span>属于</span><player-icon :player="owner"/>
            </div>
            <div v-if="inBattle">

            </div>
        </template>
    </div>
    `,
    data: () => createStore("city-detail", {
        id: 0,
        isown: false,
        owner: 0,
        name: "",
        hpmax: 0,
        hp: 0,
        IC: 0,
        RD: 0,
        population: 0,
        populationIncrease: 0,
        constructionQueue: [],
    }, (data) => {
        if (extendUI.store.link !== 'CityDetail') return;
        const id = extendUI.store.params.id;
        if (!id) {
            console.error("没有指定城市id");
            return;
        }
        const city = flags.cs[id];
        data.id = city.id;
        data.isown = flags.xzgj === city.gj;
        data.owner = city.gj;
        data.name = city.nm;
        data.hpmax = city.HP;
        data.hp = city.hp;
        data.IC = city.ic;
        data.RD = city.kj;
        data.population = city.rk;
        data.populationIncrease = city.rkzz;
        data.constructionQueue = core.clone(city.sc);
        data.armies = core.clone(city.v);
        data.enemies = core.clone(city.lin);
    }),
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
        inBattle() {
            return this.enemies.length > 0;
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
            extendUI.callModal("construction", {
                id: city.id
            });
        }
    },
    components: {
        WIcon,
        BreadCrumb,
        CityMark,
        PlayerIcon,
    },
});
