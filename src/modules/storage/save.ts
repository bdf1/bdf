/**
 * @module SaveManager 存档管理器
 * @gameLogic
 * 存储逻辑：
 * 存储时按照[startTime]进行归类，可以根据[hard]索引
 * 
 * 存储为树形结构
 *     当玩家在使用一个叶存档时，玩家只能选择覆盖存档头（replace）和追加存档（append）
 *     当玩家在使用其他存档时，会自动生成一个新的分支，玩家也可以手动将存档分叉
 * 玩家可以剪除一个指定的分支（delete），或者剪除与当前分支同级的其他分支，也可以剪除一个特定的存档（但是不能是
 */

import { largeFileStorage } from "./storage";

interface TreeNode {
    id: number;
    createTime: number[];
    saveList: number[];
    chilren?: TreeNode[];
}

interface SaveIndex {
    nextTreeId: number
    nextBrenchId: number,
    nextSaveId: number,
    treeIds: number[],
}

const EMPTY_SAVE_INDEX: SaveIndex = {
    nextTreeId: 0,
    nextBrenchId: 0,
    nextSaveId: 0,
    treeIds: [],
};

// /**
//  * 函数式数据结构，任何修改操作都会返回一个新的存档树
//  */
// export class SaveTree {
//     constructor(data: TreeNode) {
        
//     }

//     /**
//      * 从
//      * @param saveId 
//      */
//     createBrench(saveId: number) {

//     }
// }

class SaveManager {

    // @ts-ignore
    private saveIndex: SaveIndex;
    // @ts-ignore
    private saveTrees: Record<number, SaveTree>;
    // @ts-ignore
    private nodeMap: Record<number, TreeNode>;

    /**
     * 存档指针，标识当前基于的存档，即存档ID，0代表此前未使用存档
     */
    private cursor = 0;

    private static getSaveKey(id: number) {
        return `save_${ id }`;
    }

    async init() {
        const saveIndex = await largeFileStorage.get<SaveIndex>("saveIndex") ?? EMPTY_SAVE_INDEX;
        this.saveIndex = saveIndex;
        const broken = new Set();
        await Promise.all(
            saveIndex.treeIds.map(async (treeId) => {
                const data = await largeFileStorage.get<TreeNode>(`saveTree_${ treeId }`);
                if (data) {
                    // this.saveTrees[treeId] = new SaveTree(data);
                } else {
                    broken.add(treeId);
                }
            })
        );
        this.saveIndex.treeIds = this.saveIndex.treeIds.filter((treeId) => {
            return !broken.has(treeId);
        });
    }

    /**
     * 设置存档指针
     * @param pos 
     */
    setCursor(pos: number) {
        this.cursor = pos;
    }

    getNode(nodeId: number) {
        return this.nodeMap[nodeId];
    }

    createBrench() {

    }

    async getSave(saveId: number) {
        const key = SaveManager.getSaveKey(saveId);
        largeFileStorage.get(key);
    }

    async setSave(saveId: number, data: any) {
        const key = SaveManager.getSaveKey(saveId);
        await largeFileStorage.set(key, data);
    }

    /**
     * 读取
     */
    getPath() {

    }
}

export const saveManager = new SaveManager;
