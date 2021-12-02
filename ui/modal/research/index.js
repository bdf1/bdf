import { UnitIcon } from "../../components/UnitIcon/index.js";
import { ModalFrame } from "../Modal.js";

export const research = function() {
    const research = flags.gj[flags.xzgj].research;
    return Vue.extend({
        template: /* HTML */`
        <modal-frame name="research" title="研究" @close="close">
            <div v-if="field" class="process">
                    <unit-icon :unit="field" :level="fieldInfo.level+1"/>
                    <div class="info">
                        <div class="labels">
                            <div class="name">{{ fieldInfo.unit.nm }}</div>
                            <div class="value">
                                {{ processInfo.pass }} / {{ processInfo.total }} (约{{ processInfo.estimate }}回合)
                            </div>
                        </div>
                        <div class="process-bar">
                            <div class="pass" :style="processInfo.barStyle"></div>
                        </div>
                    </div>
            </div>
            <div v-else class="empty-process">
                没有指定研究方向
            </div>
            <div class="fields">
                <unit-icon v-for="field of fields" :key="field"
                    :unit="field.code" :level="field.level" size="large"
                    :class="{ viewed: selection === field.code }"
                    @click.native="view(field.code)"
                />
            </div>
            <div v-if="selection > 0" class="detail">
                <div class="list">
                    <div v-for="(unit, index) of selectionInfo" :key="unit.nm"
                        class="item" :class="{ locked: unit.locked, selected: index === viewIndex }"
                        @click="viewUnit(index)">
                        {{ unit.nm }}
                    </div>
                </div>
                <div class="right">
                    <div class="intro">
                        <h3>{{ viewedUnit.nm }}</h3>
                        hp: {{ viewedUnit.hp }}<br/>
                        战斗力: {{ viewedUnit.zdl }}<br/>
                        速度: {{ viewedUnit.sd }}<br/>
                        消耗: {{ viewedUnit.xh }}<br/>
                        研究需求: {{ viewedUnit.needRD }}
                    </div>
                    <div v-if="selectable" class="select-button" @click="select">选择</div>
                    <div v-else class="select-button disable">研发完毕</div>
                </div> 
            </div>
            <div v-else class="empty-detail">
                
            </div>
        </modal-frame>
        `,
        data: () => ({
            field: research.field,
            selection: research.field,
            viewIndex: 0,
            fields: [],
        }),
        computed: {
            fieldInfo() {
                if (this.field === 0) return null;
                const info = research.fields[this.field];
                return { ...info, unit: flags.mil[this.field][info.level+1] };
            },
            processInfo() {
                if (!this.fieldInfo) return null;
                const pass = this.fieldInfo.pass;
                const total = this.fieldInfo.levels[this.fieldInfo.level+1];
                const estimate = Math.ceil((total - pass) / core.status.hero.def); 
                let ratio = 0;
                if (total > 0) {
                    ratio = pass / total * 100;
                }
                const barStyle = `width: ${ ratio.toFixed(3) }%;`;
                return { pass, total, estimate, barStyle };
            },
            selectedFiled() {
                if (this.selection === 0) return null;
                return research.fields[this.selection];
            },
            selectionInfo() {
                if (this.selection === 0) return [];
                return flags.mil[this.selection].map((e, i) => {
                    const needRD = this.selectedFiled.levels[i];
                    const locked = (i > this.selectedFiled.level);
                    return { ...e, needRD, locked };
                }).slice(1);
            },
            viewedUnit() {
                if (this.selection === 0) return null;
                return this.selectionInfo[this.viewIndex];
            },
            selectable() {
                if (this.selection === 0) return false;
                return this.selectedFiled.level < this.selectedFiled.levels.length - 1;
            }
        },
        created() {
            this.closePromise = new Promise((res) => {
                this.closeHandler = res; 
            });
            this.fields = Object.entries(research.fields)
                .map(([ code, status ]) => {
                    return { code: Number(code), level: status.level };
                });
        },
        methods: {
            view(field) {
                if (this.selection === field) return;
                this.selection = field;
                this.viewIndex = 0;
            },
            viewUnit(index) {
                this.viewIndex = index;
            },
            select() {
                this.field = this.selection;
            },
            wait() {
                return this.closePromise;
            },
            close() {
                if (this.field !== research.field) {
                    extendUI.execCommand("setResearchField", {
                        field: this.field
                    });
                }
                this.closeHandler();
            },
        },
        components: {
            ModalFrame,
            UnitIcon,
        }
    });
}
