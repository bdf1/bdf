<script lang="ts" setup>

</script>
<template>
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
</template>

<style lang="less" scoped>
</style>