export const ModalFrame = Vue.extend({
    template: /* HTML */`
    <div class="modal-mask">
        <div class="modal" :class="name">
            <div class="titlebar">
                <div class="title">{{ title }}</div>
                <div class="close" @click="close">×</div>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
    `,
    props: {
        name: String,
        title: String,
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }
});