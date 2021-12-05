export const UnitCard = Vue.extend({
    template: /* HTML */`
    <div class="unit-card" :style="unitStyle" @click="onClick">
        <div class="unit-counter">{{ unit.count }}</div>
    </div>
    `,
    props: {
        unit: Object,
    },
    methods: {
        onClick() {
            extendUI.execCommand("sidebar/goto", { link: "UnitDetail", params: {
                id: this.unit.id,
            } });
        }
    },
    computed: {
        unitStyle() {
            const style = {}, { color, status } = this.unit;
            style.backgroundColor = color;
            if (status[0] == 1 || status[0] == 2) {
                const [ x, y ] = status[1];
                style.left = (x * 32 + 5) + 'rem';
                style.top  = (y * 32 + 5) + 'rem';
            } else if (status[0] == 3) {
                const [ x, y ] = status[1];
                style.left = (x * 32 + 1) + 'rem';
                style.top  = (y * 32 + 9) + 'rem';
            } else if (status[0] == 4) {
                const [ x, y ] = status[1];
                style.left = (x * 32 + 9) + 'rem';
                style.top  = (y * 32 + 1) + 'rem';
            }
            return style;
        }
    }
});
