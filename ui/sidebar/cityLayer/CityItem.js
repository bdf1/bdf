import { WIcon } from "../../components/Icon/index.js";
import { UnitIcon } from "../../components/UnitIcon/index.js";


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
    <div class="city-item">
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
        <div class="construction">
            <unit-icon :unit="1" :level="1" />
            <div class="process-label">
                <div class="value">{{ hp }}/{{ hpmax }}</div>
            </div>
            <div class="process-bar">
                <div class="pass" :style="barStyle"></div>
            </div>
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
        cityLevel() {
            if (this.hpmax === 30000) return 4;
            if (this.hpmax === 20000) return 3;
            if (this.hpmax === 10000) return 2;
            if (this.hpmax === 5000 ) return 1;
        },
        cityMark() {
            return CityMarks[this.cityLevel];
        },
    },
    components: {
        UnitIcon,
        WIcon,
    }
});
