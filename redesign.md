# wendigo-runtime 重构

 - 完全放弃 api 兼容
 - 重新设计全部UI
 - 基于vite + vue + vue响应式api

## view

```jsx
const App = (
    <ViewStack />
);
```

```js
viewInstance.close(value: T) // 主动关闭 - 如果有返回值则必须自己填充
viewInstance.waitClose(): T // 等待返回值
viewInstance.beforeClose(() => {}) // 返回之前的钩子，能block返回
```

```js
const loadingView = showloadingView();
await core.load();
loadingView.close();

while (true) {
    const titleView = showTitleView();
    const [ type, param ] = await titleView.waitClose();

    showMainView();
    switch (type) {
        case xxx:
            await core.start();
        case yyy:
            await core.startFromSave();
        case zzz:
            await core.startFromReplay();
    }
    ViewStack.dump();
}
```

```ts
import { reset, dump, load, history, defineStore, isReplaying } from "state";

const mainStore = defineStore(() => {
    return {
        currentMap: map[0],
        maps: [],
    }
}, {
    serializer(data) {
        return JSON.stringify(data);
    },
    deserializer(data) {
        return JSON.parse(data);
    },
});

mainStore.registerAction(() => {

});
const { registerAction, registerQuery } = store;

watch(() => mainStore.state.map, () => {
    console.log("xxx");
});

// 注册一个状态源
const { state, registerAction, registerQuery } = defineStore((maps: Map[]) => {
    return {
        state: {
            currentMap: map[0],
            maps,
        },
    };
});

// 直接使用现有状态 - 也许可以做只读检查
state.maps.forEach((map) => {
    console.log(map);
})

// 克隆当前的全部状态源
const _state = dump();
// 加载一个状态
load(_state);

// 注册一个指令
const changeMap = registerAction("changeMap", ({ state, isReplaying }, mapIndex: number) => {
    await mapView.fadeOut();

    // doChangeMap

    await mapView.fadeIn();
});
changeMap(1);

// 将现在的操作历史打印出来
const currentHistory = history.dump(); // [ [ "changeMap", [1] ] ]

// 重置状态和操作历史
reset();

// 从头开始重放操作历史
history.apply(currentHistory);

history.apply();

const rand = registerQuery("random", (num: number) => {
    return Math.floor(Math.random() * num);
});
```

```
Action: move:10,7
random: 1
choice: 3
Action: minigame
```

const ramdom = registerQuestion<number>("random");

const rand = defineQuery(random, () => {
    
});
Query
Query random:1

const i = confirm("xxx", () => {

});

if (i) {

}

if (isInReplay()) {

}

```
Action move:10,7
Query random:1
Query choice:3
Action open-minigame [
    SubLoop minigame [
        Action move:'up', [
            Query random:1
            SubLoop minigame-deep [
                Action: minigame/minigame-deep/move:true [
                    Query random:10
                ]
            ]
        ]
    ]
]
```