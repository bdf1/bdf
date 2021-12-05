import { extendUI } from "../../index.js";
import { createStore } from "../../store/index.js";

export const CityDetail = Vue.extend({
    template: /* HTML */`
    <div>

    </div>
    `,
    data: () => createStore("cityDetail", {
        store: extendUI.store,
    }),
});
