import { BreadCrumb } from "../../components/BreadCrumb/index.js";
import { extendUI } from "../../index.js";
import { createStore } from "../../store/index.js";
import { CityItem } from "./CityItem.js";

export const CityList = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-layer city-list">
        <bread-crumb :path="[['', '主界面']]" now="城市列表"/>
        <div class="list">
            <city-item v-for="city of cities" :key="city.id" v-bind="city"></city-item>
        </div>
    </div>
    `,
    data: () => createStore("city-list", {
        cities: [],
    }, (data) => {
        const cities = [];
        for (let i = 0; i < flags.cs.length; i++) {
            const city = flags.cs[i];
            if (city.gj !== flags.xzgj) continue;
            cities.push({
                id: i,
                name: city.nm,
                hpmax: city.HP,
                hp: city.hp,
                ic: city.ic,
                population: city.rk,
                populationIncrease: city.rkzz,
                constructionQueue: core.clone(city.sc),
            });
        }
        data.cities = cities;
    }),
    components: {
        CityItem,
        BreadCrumb,
    },
});
