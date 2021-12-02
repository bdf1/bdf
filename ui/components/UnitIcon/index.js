import { WIcon } from "../Icon/index.js";

const IconRegistry = {
    "1": { icon: "helmet", color: "#FDD835" },
    "2": { icon: "military-vehicle", color: "#FDD835" },
    "3": { icon: "tank", color: "#FDD835" },
    "4": { icon: "rocket", color: "#FDD835" },
    "5": { icon: "nuclear-bomb", color: "#FDD835" },
    "8": { icon: "factory-xs", color: "#FDD835" },
    "9": { icon: "physics-xs", color: "#FDD835" },
}

export const UnitIcon = Vue.extend({
    template: /* HTML */`
    <div class="unit-icon" :class="size">
        <w-icon :icon="icon.icon" :style="{ backgroundColor: icon.color }" />
        <div v-if="level >= 0" class="level">{{ level }}</div>
        <div v-if="count >= 0" class="count">{{ count }}</div>
    </div>
    `,
    props: {
        unit: Number,
        level: { type: Number, default: -1 },
        count: { type: Number, default: -1 },
        size: { type: String, default: "normal" }
    },
    computed: {
        icon() {
            return IconRegistry[this.unit] || {};
        }
    },
    components: {
        WIcon,
    }
});
