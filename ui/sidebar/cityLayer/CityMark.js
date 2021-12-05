
// core.clearMap(ctx1);
// core.fillCircle(ctx1, 16, 16, 6, "#000")
// core.strokeCircle(ctx1, 16, 16, 9, "#000", 1);
// core.strokeCircle(ctx1, 16, 16, 13, "#000", 1);
// core.clearMap(ctx2);
// core.strokeCircle(ctx2, 16, 16, 5, "#000", 1);
// core.strokeCircle(ctx2, 16, 16, 9, "#000", 1);
// core.clearMap(ctx3);
// core.fillCircle(ctx3, 16, 16, 4, "#000", 1);
// core.strokeCircle(ctx3, 16, 16, 8, "#000", 1);
// core.clearMap(ctx4);
// core.strokeCircle(ctx4, 16, 16, 6, "#000", 1);


export const CityMark = Vue.extend({
    template: /* HTML */`
    <div class="city-mark">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32">
            <template v-if="level === 1">
                <circle cx="16" cy="16" r="6"  :stroke="color" stroke-width="1" fill="none"/>
            </template>
            <template v-else-if="level === 2">
                <circle cx="16" cy="16" r="4"  :fill="color"/>
                <circle cx="16" cy="16" r="8"  :stroke="color" stroke-width="1" fill="none"/>
            </template>
            <template v-else-if="level === 3">
                <circle cx="16" cy="16" r="5"  :stroke="color" stroke-width="1" fill="none"/>
                <circle cx="16" cy="16" r="9"  :stroke="color" stroke-width="1" fill="none"/>
            </template>
            <template v-else-if="level === 4">
                <circle cx="16" cy="16" r="6"  :fill="color"/>
                <circle cx="16" cy="16" r="9"  :stroke="color" stroke-width="1" fill="none"/>
                <circle cx="16" cy="16" r="13" :stroke="color" stroke-width="1" fill="none"/>
            </template>
        </svg>
    </div>
    `,
    props: {
        level: Number,
        color: { type: String, default: "#000000" },
    },
})