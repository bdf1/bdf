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
    <w-icon class="unit-icon" :icon="icon.icon" :style="backgroundColor: icon.color" />
    `,
    props: {
        unit: {},
        level: Number,
    },
    computed: {
        icon() {
            return IconRegistry[unit] || {};
        }
    },
    components: {
        WIcon,
    }
});
