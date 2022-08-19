

export const BattlePanel = Vue.extend({
    template: /* HTML */`
    <div v-if="battles.length" class="sidebar-item battle">
        <!-- <battle-item v-for="battle of battles" :key="battle.id" :battle="battle" /> -->
    </div>
    `,
    data: () => ({
        battles: [],
    }),
    created() {

    },
    components: {
        
    }
});
