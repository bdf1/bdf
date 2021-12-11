export const NativeIcon = Vue.extend({
    template: /* HTML */`
    <img class="icon" :src="src"/>
    `,
    props: {
        icon: String,
    },
    computed: {
        src() {
            return core.statusBar.icons[this.icon].src;
        }
    }
});
