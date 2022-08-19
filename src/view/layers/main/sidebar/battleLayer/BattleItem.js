

export const battleItem = Vue.extend({
    template: /* HTML */`
    <div class="battle-item">
        <unit-icon unit="nuclear-bomb" level="1" />
        <div class="process">
            <div class="process-label">
                <div class="name">{{ name }}</div>
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
    },
    computed: {
        barStyle() {
            let ratio = 0;
            if (this.hpmax > 0) {
                ratio = this.hp / this.hpmax * 100;
            }
            return `width: ${ ratio.toFixed(3) }%;`;
        }
    },
});
