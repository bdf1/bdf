import { CityItem } from "./CityItem";

export const CityList = Vue.extend({
    template: /* HTML */`
    <div>
        <city-item></city-item>
    </div>
    `,
    components: {
        CityItem,
    }
});
