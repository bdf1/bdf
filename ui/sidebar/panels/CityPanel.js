import { extendUI } from "../../index.js";

export const CityPanel = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-item city">
        <div class="stat">城市数量: {{ cityCnt }}</div>
        <div class="stat" v-if="freeCity > 0">空闲城市: {{ freeCity }}</div>
        <div class="stat" v-if="cityInBattle > 0">交战中的城市: {{ cityInBattle }}</div>
    </div>
    `,
    data: () => ({
        cityCnt: 0,
        freeCity: 0,
        cityInBattle: 0,
    }),
    created() {
        extendUI.onUpdate(() => {
            if (!flags.xzgj) return;
            let cityCnt = 0;
            let freeCity = 0;
            let cityInBattle = 0;
            for (let i = 1; i < flags.cs.length; i++) {
                if (flags.cs[i].gj !== flags.xzgj) continue;
                cityCnt++;
                if (flags.cs[i].sc.length === 0) {
                    freeCity++;
                }
                if (flags.cs[i].lin.length > 0) {
                    cityInBattle++;
                }
            }
            this.cityCnt = cityCnt;
            this.freeCity = freeCity;
            this.cityInBattle = cityInBattle;
        });
    },
    methods: {

    },
    components: {

    }
});
