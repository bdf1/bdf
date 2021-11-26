/**
 * @module ui.js 状态栏UI
 */

/**
 * 
 * @param {HTMLElement} rootContainer 
 * @returns 
 */
window.initUI = function(rootContainer) {

    const _subscribers = [];
    function watchGameData(action) {
        _subscribers.push(action);
    }
    function updateGameData(gamedata) {
        _subscribers.forEach((action) => {
            action(gamedata);
        })
    }
    const _actions = {};
    function attachAction(name, action) {
        if (name in _actions) {
            console.warn(`${ name }操作已经被注册过`);
        }
        _actions[name] = action;
    }
    function doAction(name, payload) {
        if (name in _actions) {
            _actions[name](payload);
        } else {
            console.error(`${ name }操作未被注册过, payload: ${ payload }`);
        }
    }

    const WIcon = {
        template: /* HTML */`
        <div class="icon">
            <img :src="'img/icons8-' + icon +'.png'"/>
        </div>
        `,
        props: {
            icon: String,
        }
    }

    const UnitIcon = {
        template: /* HTML */`
        <div class="unit-icon icon">
            <img :src="'img/icons8-' + icon +'.png'"/>
        </div>
        `,
        props: {
            unit: String,
            level: Number,
        }
    }

    const topbar = {
        template: /* HTML */`
        <div class="topbar">
            <div v-if="onSelection"></div>
            <div v-else class="topbar-left">
                <div class="topbar-item">
                    <div class="user-color"></div>
                    <div class="value">{{ player }}/{{ totalPlayers }}</div>
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
                    <div class="value">{{ research }}/{{ totalResearch }}</div>
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
        data: {
            onSelection: false,
            player: "",
            totalPlayers: 0,
            turn: 0,
            hard: "",
            IC: 0,
            research: 0,
            totalIC: 0,
            totalResearch: 0,
        },
        created() {
            watchGameData((gamedata) => {
                this.hard = gamedata.hard;
                if (gamedata.state === 'selection') {
                    this.onSelection = true;
                    return;
                }

                this.onSelection = false;

                const flags = gamedata.flags;
                this.player = flags.gj[flags.xzgj].nm;
                this.totalPlayers = 0;
                flags.gj.forEach((e) => {
                    if (e.nm && e.sile === false) {
                        this.totalPlayers++;
                    }
                });

                const hero = gamedata.hero;
                this.turn = hero.money;
                this.IC = hero.atk;
                this.research = hero.def;
                this.totalIC = hero.mdef;
                this.totalResearch = hero.exp;
            });
        },
        methods: {
            openHelp() {

            },
            openSave() {
                doAction("openSave");
            },
            openLoad() {
                doAction("openLoad");
            },
            openSettings() {
                doAction("openSettings");
            },
        },
        components: {
            WIcon,
        }
    }

    const warPanel = {
        template: /* HTML */`
        <div class="sidebar-item war">
            <div v-if="enemies.length > 0">
                
            </div>
            <div v-else class="empty">
                当前未参战
            </div>
        </div>
        `,
        data: () => ({
            enemies: [],
        }),
        created() {

        },
        methods: {
            
        },
    }

    const researchPanel = {
        template: /* HTML */`
        <div class="sidebar-item research" @click="openScienceDialog">
            <div v-if="name">
                <unit-icon unit="nuclear-bomb" level="1" />
                <div class="process">
                    <div class="process-label">
                        <div class="name">{{ name }}</div>
                        <div class="value">{{ pass }}/{{ total }}</div>
                    </div>
                    <div class="process-bar">
                        <div class="pass" :style="barStyle"></div>
                    </div>
                </div> 
            </div>
            <div v-else class="empty">
                <w-icon class="blink warning" icon="warning" />选择研究方向
            </div>
        </div>
        `,
        data: {
            name: "",
            pass: 0,
            total: 0,
        },
        computed: {
            barStyle() {
                let ratio = 0;
                if (this.total > 0) {
                    ratio = this.pass / this.total * 100;
                }
                return `width: ${ ratio.toFixed(3) }%;`;
            }
        },
        created() {
            watchGameData((gamedata) => {

            });
        },
        methods: {
            openScienceDialog() {

            },
        },
        components: {
            UnitIcon,
            WIcon,
        }
    }

    const cityItem = {
        template: /* HTML */`
        <div class="city-item">
            <unit-icon unit="nuclear-bomb" level="1" />
            <div class="process">
                <div class="process-label">
                    <div class="name">{{ name }}</div>
                    <div class="value">{{ hp }}/{{ hpmax }}</div>
                </div>
                <div class="process-bar">
                    <div class="pass" :style="barStyle"></div>
                </div>
            </div> 
        </div>
        `,
        props: {
            id: Number,
            name: String,
            hpmax: Number,
            hp: Number,
        },
        computed: {
            barStyle() {
                let ratio = 0;
                if (this.hpmax > 0) {
                    ratio = this.hp / this.hpmax * 100;
                }
                return `width: ${ ratio.toFixed(3) }%;`;
            }
        },
    }

    const cityPanel = {
        template: /* HTML */`
        <div class="sidebar-item city">
            <city-item v-for="city of cities" key="city.id" v-bind="city" />
        </div>
        `,
        data: {
            cities: [],
        },
        created() {
            this.cities = [
                {
                    id: 1,
                    name: "霖 1",
                    hpmax: 30000,
                    hp: 30000,
                    ic: 10,
                    research: 10,
                    army: [],
                    enemy: [],
                    population: 60,
                    populationIncrease: 2,
                    constructionQueue: [],
                }
            ]
        },
        methods: {

        },
        components: {
            cityItem,
        }
    }

    const battlePanel = {
        template: /* HTML */`
        <div class="sidebar-item battle">
            交战
        </div>
        `,
    }

    const misslePanel = {
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
    }

    const nextButton = {
        template: /* HTML */`
        <div class="sidebar-item next-turn">
            下一回合
        </div>
        `,
    }

    const sidebar = {
        template: /* HTML */`
        <div v-if="onSelection">

        </div>
        <div v-else class="sidebar">
            <war-panel />
            <research-panel />
            <city-panel />
            <battle-panel />
            <missle-panel />
            <next-button />
        </div>
        `,
        data: () => ({
            onSelection: false,
        }),
        created() {
            watchGameData((gamedata) => {
                if (gamedata.state === 'selection') {
                    this.onSelection = true;
                    return;
                }
                this.onSelection = false;
            });
        },
        components: {
            WIcon,
            warPanel,
            researchPanel,
            cityPanel,
            battlePanel,
            misslePanel,
            nextButton,
        }
    }

    const topbarContainer  = document.createElement("div"),
          sidebarContainer = document.createElement("div");
    
    rootContainer.appendChild(topbarContainer);
    rootContainer.appendChild(sidebarContainer);

    function hideUI() {
        topbarContainer .style.display = "none";
        sidebarContainer.style.display = "none";
    }

    function showUI() {
        topbarContainer .style.display = "";
        sidebarContainer.style.display = "";
    }
    
    new Vue(topbar).$mount(topbarContainer);
    new Vue(sidebar).$mount(sidebarContainer);
    return {
        update: updateGameData,
        hide: hideUI,
        show: showUI,
        attach: attachAction,
    };
};
