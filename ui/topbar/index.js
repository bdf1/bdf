import { extendUI } from "../index.js";
import { WIcon } from "../components/Icon/index.js";
import { PlayerIcon } from "../components/PlayerIcon/index.js";

export const Topbar = Vue.extend({
    template: /* HTML */`
    <div v-if="store.serve" v-show="show"
        class="topbar" :class="{ lockControl }"
    >
        <div v-if="onSelection"></div>
        <div v-else class="topbar-left">
            <div class="topbar-item">
                <div class="user-color" :style="{ backgroundColor: color }"></div>
                <div class="value">{{ playername }}/{{ totalPlayers }}</div>
            </div>
            <div class="topbar-item">
                <w-icon icon="time" />
                <div class="value">{{ turn }}</div>
            </div>
            <div class="topbar-item">
                <w-icon icon="factories" />
                <div class="value">{{ IC }}/{{ totalIC }}</div>
            </div>
            <div class="topbar-item">
                <w-icon icon="physics" />
                <div class="value">{{ RD }}/{{ totalRD }}</div>
            </div>
        </div>
        <div class="topbar-right">
            <!-- <div class="topbar-item">
                <div class="value">54</div>
            </div>
            <div class="topbar-item">
                <div class="icon"><img src="img/icons8-factories.png"/></div>
                <div class="value">1188</div>
            </div>
            <div class="topbar-item">
                <div class="icon"><img src="img/icons8-physics.png"/></div>
                <div class="value">1188</div>
            </div> -->
            <div class="topbar-item">
                <div class="hard-label" :class="'hard-'+hard">{{ hard }}</div>
            </div>
            <div class="topbar-item">
                <w-icon class="button" icon="help" @click.native="openHelp" />
                <w-icon class="button" icon="save" @click.native="openSave" />
                <w-icon class="button" icon="opened-folder" @click.native="openLoad" />
                <w-icon class="button" icon="settings" @click.native="openSettings" />
            </div>
        </div>
    </div>
    `,
    data: () => ({
        show: false,
        store: extendUI.store,
        lockControl: false,
        onSelection: false,
        player: 0,
        playername: "",
        color: "",
        totalPlayers: 0,
        turn: 0,
        hard: "",
        IC: 0,
        RD: 0,
        totalIC: 0,
        totalRD: 0,
    }),
    created() {
        extendUI.onUpdate(() => {
            this.show = core.domStyle.showStatusBar;
            this.lockControl = core.status.lockControl;
            this.hard = core.status.hard;
            if (!flags.xzgj) {
                this.onSelection = true;
                return;
            }

            this.onSelection = false;

            this.player = flags.xzgj;
            this.playername = flags.gj[this.player].nm;
            this.color = flags.color[this.player];
            this.totalPlayers = 0;
            flags.gj.forEach((e) => {
                if (e.nm && e.sile === false) {
                    this.totalPlayers++;
                }
            });

            const hero = core.status.hero;
            this.turn = hero.money;
            this.IC = hero.atk;
            this.RD = hero.def;
            this.totalIC = hero.mdef;
            this.totalRD = hero.exp;
        })
    },
    methods: {
        openHelp() {
            extendUI.callModal("tutorial");
        },
        openSave() {
            extendUI.execCommand("openSave");
        },
        openLoad() {
            extendUI.execCommand("openLoad");
        },
        openSettings() {
            extendUI.execCommand("openSettings");
        },
    },
    components: {
        WIcon,
        PlayerIcon,
    }
});
