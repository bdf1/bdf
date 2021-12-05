import { extendUI } from "../index.js"

export const CityBlock = Vue.extend({
    template: /* HTML */`
    <div class="city-block" :style="cityStyle" @click="onClick">
        
    </div>
    `,
    props: {
        city: Object,
    },
    computed: {
        cityStyle() {
            const style = {}, { x, y } = this.city;
            style.left = x * 32 + 'rem';
            style.top = y * 32 + 'rem';
            return style;
        },
    },
    methods: {
        onClick() {
            if (!flags.xzgj) {
                flags.selection = flags.cs[this.city.id].gj;
                extendUI.update();
            } else {
                extendUI.execCommand("sidebar/goto", { link: "CityDetail", params: {
                    id: this.city.id,
                } });
            }
        }
    }
})