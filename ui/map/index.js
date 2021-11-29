import { extendUI } from "../index.js"
import { UnitCard } from "./UnitCard.js";

export const MapBoard = Vue.extend({
    template: /* HTML */`
    <div v-if="store.serve" class="map-board">
        <unit-card v-for="unit of units" :key="unit.id" :unit="unit" />
    </div>
    `,
    data: () => ({
        store: extendUI.store,
        units: [],
    }),
    created() {
        extendUI.onUpdate(() => {
            if (!flags.xzgj) return;
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
            this.units = units;
        });
    },
    components: {
        UnitCard,
    }
})