export const tutorial = function() { 
    return Vue.extend({
        template: /* HTML */`
        <div>
            <div></div>
        </div>
        `,
        data: () => ({

        }),
        created() {
            this.closePromise = new Promise((res) => {
                this.closeHandler = res; 
            });
        },
        methods: {
            wait() {
                return this.closePromise;
            },
            close() {
                this.closeHandler();
            },
        }
    });
}
