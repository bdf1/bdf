import { extendUI } from "../index.js";
import { WIcon } from "../components/Icon/index.js";
import { PlayerIcon } from "../components/PlayerIcon/index.js";
import { createStore } from "../store/index.js";
import { NativeIcon } from "../components/NativeIcon/index.js";

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
                <template v-if="isReplaying">
                    <native-icon v-if="isPlaying" class="button" icon="stop" @click.native="stopReplay"/>
                    <native-icon v-else class="button" icon="play" @click.native="startReplay"/>
                    <native-icon class="button" icon="step" @click.native="stepReplay"/>
                    <native-icon class="button" icon="rewind" @click.native="rewindReplay"/>
                    <native-icon class="button" icon="speedUp" @click.native="speedUpReplay"/>
                    <native-icon class="button" icon="speedDown" @click.native="speedDownReplay" />
                    <w-icon class="button" icon="save" @click.native="replaySave" />
                </template>
                <template v-else>
                    <w-icon class="button" icon="help" @click.native="openHelp" />
                    <w-icon class="button" icon="save" @click.native="openSave" />
                    <w-icon class="button" icon="opened-folder" @click.native="openLoad" />
                    <w-icon class="button" icon="settings" @click.native="openSettings" />
                </template>
            </div>
        </div>
    </div>
    `,
    data: () => createStore("topbar", {
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
        isReplaying: false,
    }, (data) => {
        data.show = core.domStyle.showStatusBar;
        data.lockControl = core.status.lockControl;
        data.hard = core.status.hard;
        data.isReplaying = core.isReplaying();
        if (!flags.xzgj) {
            data.onSelection = true;
            return;
        }

        data.onSelection = false;

        data.player = flags.xzgj;
        data.playername = flags.gj[data.player].nm;
        data.color = flags.color[data.player];
        data.totalPlayers = 0;
        flags.gj.forEach((e) => {
            if (e.nm && e.sile === false) {
                data.totalPlayers++;
            }
        });

        const hero = core.status.hero;
        data.turn = hero.money;
        data.IC = hero.atk;
        data.RD = hero.def;
        data.totalIC = hero.mdef;
        data.totalRD = hero.exp;
    }),
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
        NativeIcon,
        PlayerIcon,
    }
});
