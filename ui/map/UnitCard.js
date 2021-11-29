export const UnitCard = Vue.extend({
    template: /* HTML */`
    <div class="unit-card" :style="unitStyle">
        <div class="unit-counter">{{ unit.count }}</div>
    </div>
    `,
    props: {
        unit: Object,
    },
    computed: {
        unitStyle() {
            const style = {}, { color, status } = this.unit;
            style.backgroundColor = color;
            if (status[0] == 1 || status[0] == 2) {
                const [ x, y ] = status[1];
                style.left = (x * 32 + 7) + 'rem';
                style.top  = (y * 32 + 7) + 'rem';
            } else if (status[0] == 3) {
                const [ x, y ] = status[1];
                style.left = (x * 32 + 3 ) + 'rem';
                style.top  = (y * 32 + 11) + 'rem';
            } else if (status[0] == 4) {
                const [ x, y ] = status[1];
                style.left = (x * 32 + 11) + 'rem';
                style.top  = (y * 32 + 3 ) + 'rem';
            }
            return style;
        }
    }
});
