export const WIcon = Vue.extend({
    template: /* HTML */`
    <img class="icon" :src="src"/>
    `,
    props: {
        icon: String,
    },
    computed: {
        src() {
            return core.material.images.images[`icons8-${ this.icon }.png`].src;
        }
    }
});
