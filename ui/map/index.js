import { extendUI } from "../index.js"
import { createStore } from "../store/index.js";
import { CityBlock } from "./CityBlock.js";
import { UnitCard } from "./UnitCard.js";

export const MapBoard = Vue.extend({
    template: /* HTML */`
    <div v-if="store.serve" class="map-board" :class="{ lockControl }">
        <city-block v-for="city of cities" :key="city.id" :city="city"></city-block>
        <unit-card v-for="unit of units" :key="unit.id" :unit="unit" />
    </div>
    `,
    data: () => createStore("map", {
        store: extendUI.store,
        cities: [],
        units: [],
        lockControl: false,
    }, (data) => {
        data.lockControl = core.status.lockControl;
        if (!Array.isArray(flags.cs)) return;
        // 对于选中军队的情况，要锁定无法移动到的地块，并添加浮层
        if (extendUI.store.link === "UnitDetail") {

        }
        // 渲染城市
        const cities = [];
        for (var i = 1; i < flags.cs.length; i++) {
            var city = flags.cs[i];
            cities.push({
                id: i,
                x: city.x,
                y: city.y,
            });
        }
        data.cities = cities;
        // 渲染单位
        const units = [];
        for (var i = 1; i < flags.cs.length; i++) {
            var city = flags.cs[i];
            if (city.v.length > 0 && city.lin.length > 0) {
                units.push({
                    id: "3:"+i,
                    status: [ 3, [ city.x, city.y ] ],
                    count: city.v.length,
                    color: flags.color[city.gj],
                });
                units.push({
                    id: "4:"+i,
                    status: [ 4, [ city.x, city.y ] ],
                    count: city.lin.length,
                    color: flags.color[flags.dw[city.lin[0]].gj],
                });
            } else if (city.v.length > 0) {
                units.push({
                    id: "1:"+i,
                    status: [ 1, [ city.x, city.y ] ],
                    count: city.v.length,
                    color: flags.color[city.gj],
                });
            } else if (city.lin.length > 0) {
                units.push({
                    id: "2:"+i,
                    status: [ 2, [ city.x, city.y ] ],
                    count: city.lin.length,
                    color: flags.color[flags.dw[city.lin[0]].gj],
                });
            }
        }
        data.units = units;
    }),
    created() {

    },
    components: {
        UnitCard,
        CityBlock,
    }
})
