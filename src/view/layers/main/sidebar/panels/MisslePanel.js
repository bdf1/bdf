

export const MisslePanel = Vue.extend({
    template: /* HTML */`
    <div class="sidebar-item missle" :class="has ? '' : 'disabled'">
        <div v-if="has">

        </div>
        <div v-else class="empty">
            还没有导弹
        </div>
    </div>
    `,
    data: () => ({
        missles: [],
    }),
    computed: {
        has() {
            return this.missles.length > 0;
        }
    }
});
