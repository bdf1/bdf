export const WIcon = Vue.extend({
    template: /* HTML */`
    <div class="icon">
        <img :src="'img/icons8-' + icon +'.png'"/>
    </div>
    `,
    props: {
        icon: String,
    }
});
