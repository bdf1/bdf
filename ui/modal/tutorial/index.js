import { ModalFrame } from "../Modal.js";

const chapters = [
    {
        title: "游戏介绍",
        content: /* HTML */`
        <p>战争世界Ⅱ是一款回合制的兵棋游戏。</p>
        <p>游戏的目标是击败其他国家，游戏计分方式为1000-所用回合数。</p>
        `,
    },
    {
        title: "生产&科研",
        content: /* HTML */`
        <p>游戏中的军队需要通过生产获得。除此之外，也可以通过建设工厂来提高生产能力。</p>
        <p>游戏中有两种生产资源: 工业值和可用人口。生产是按城市进行的，每个城市的生产都只计算该城市的工业值和可用人口，具体来说，每个生产任务都有工业值和可用人口的需求，每回合，生产任务所需的工业值会减扣该城市的工业值，当所需工业值减扣为0时，若有足够的可用人口，则生产完成，否则任务将不会完成，但是会积累额外的生产进度，当该任务最终完成时，额外的生产进度会转移给下一个任务。若取消正在进行的生产任务，消耗的工业值不会返还。</p>
        <p>若城市被敌军占领，则生产队列将会清空。</p>
        <p>游戏中高级的军队，以及导弹，核弹等需要通过科研解锁。一个玩家同时只能研究一种科技，科技有科研值的需求，每回合，科研的进度都会增加当前玩家所有城市的科技值总和。</p>
        `,
    },
    {
        title: "战争规则",
        content: /* HTML */`
        <p>游戏中，需要宣战才可以进攻其他玩家，如果一方单方面宣战，则双方都可以互相攻击，另一方不用再行宣战，战争一旦开始将不会结束，直到一方的城市全部被攻占为止。</p>
        <p>军队在我方城市间移动时不需要考虑是否相邻，但是攻击敌方时只能在相邻的城市间移动，具体来说，如果两个城市属于一个红框，则它们相邻。除此之外，军队也不能进入未宣战的玩家的城市。</p>
        <p>军队在城市间移动需要消耗回合数，回合数与军队的机动力有关，具体来说，军队在城市间移动时，需要消耗10机动力，导弹发射时时则需要20机动力，开始移动后，每回合移动进度都会增加军队的机动力，直到移动完成。</p>
        <p>战斗以城市为单位，移动中的军队不会参与战斗。</p>
        <p>如果一个城市中有该城市所属国家的敌国的军队，那么这座城市就会发生战斗，战斗将在城市所属国家的军队和敌国的军队间进行，即使这些敌国也已经互相宣战。</p>
        `,
    },
    {
        title: "交战计算",
        content: /* HTML */`
        <p>发生战斗时，双方每回合同时会向对方随机军队发出一次等于军队攻击力 90%~110% 的攻击。</p>
        <p>城市会为守军提供一定的保护作用，具体来说，城市有hp值，当hp值大于0时，敌军有60%的概率攻击城市，城市hp值为0时，将不再具有保护作用。如果城市中没有守军，则敌军的攻击将始终指向城市。</p>
        <p>城市的hp值会恢复，如果进行交战，则回复的速度将会很缓慢，如果交战时城市的hp到达0，则将不会再进行回复。</p>
        <p>军队的HP不会增长，当军队HP<=0时死亡(消失)，军队和城市没有防御力和护盾。</p>
        <p>当一个城市没有守军，并且城市的hp值为0时，城市可以被攻占，如果满足条件时，有多个国家的军队在此城市中，那么最早到达的军队所属的国家将会成为占领者。</p>
        `,
    },
]

export const tutorial = function(selection = 0) { 
    return Vue.extend({
        template: /* HTML */`
        <modal-frame name="tutorial" title="教程" @close="close">
            <div class="outline">
                <div v-for="(chapter, index) of chapters" :key="index"
                    class="item" :class="{ active: index === selection }"
                    @click="select(index)"
                >{{ chapter.title }}</div>
            </div>
            <div class="content">
                <h2 class="title">{{ currentChapter.title }}</h2>
                <article v-html="currentChapter.content" />
                <!-- <div class="pagination">
                    <div v-if="selection > 0" class="prev" @click="prev">
                        <a href="javascript:void 0">上一节 - {{ chapters[selection-1].title }}</a>
                    </div>
                    <div v-if="selection < chapters.length - 1" class="next" @click="next">
                        <a href="javascript:void 0">下一节 - {{ chapters[selection+1].title }}</a>
                    </div>
                </div> -->
            </div>
        </modal-frame>
        `,
        data: () => ({
            chapters,
            selection,
        }),
        computed: {
            currentChapter() {
                return this.chapters[this.selection];
            }
        },
        created() {
            this.closePromise = new Promise((res) => {
                this.closeHandler = res; 
            });
        },
        methods: {
            select(index) {
                this.selection = index;
            },
            prev() {
                this.selection -= 1;
            },
            next() {
                this.selection += 1;
            },
            wait() {
                return this.closePromise;
            },
            close() {
                this.closeHandler();
            },
        },
        components: {
            ModalFrame,
        },
    });
}
