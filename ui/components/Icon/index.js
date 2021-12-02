export const WIcon = Vue.extend({
    template: /* HTML */`
    <img class="icon" :src="'img/icons8-' + icon +'.png'"/>
    `,
    props: {
        icon: String,
    }
});
