import { TOWER_ID, VERSION } from "@/constant";
import { encodeBase64 } from "@/utils/common";
import { createFormData } from "@/utils/net";
import axios from "axios";
import { platform } from "../client/platform";

class WebsiteSDK {
    /**
     * 报告游玩
     * @param hard 难度名 
     * @param hardCode 难度编码
     */
    async reportPlay(hard: string, hardCode: number) {
        await axios.post("/games/upload.php", createFormData({
            type: "people",
            name: TOWER_ID,
            version: VERSION,
            platform: platform.string,
            hard: encodeBase64(hard),
            hardCode: hardCode.toString(),
            base64: '1',
        }));
    }

    /**
     * 上传成绩
     * @param username 用户名 
     * @param ending 
     * @param hard 
     * @param score 
     * @param route 
     */
    async uploadScore(username: string, ending: string, hard: string, score: number, route: string) {
        await axios.post("/games/upload.php", createFormData({
            type: "score",
            name: TOWER_ID,
            username,
            version: VERSION,
            platform: platform.string,
            ending,
            hard,
            extra: '',
            hp: score.toString(),
            route,
            base64: '0',
        }));
    }

    /**
     * 将本地数据推送到远程
     * @param datastring 数据
     */
    async pushData(datastring: string): Promise<string> {
        const { data } = await axios
            .post<{ code: number, msg: string }>(
                "/games/sync.php",
                createFormData({
                    type: "save",
                    name: TOWER_ID,
                    data: datastring,
                    shorten: '1'
                })
            );
        if (data.code < 0) {
            throw Error(data.msg);
        } else {
            return data.code + data.msg;
        }
    }

    /**
     * 从远程拉取数据
     * @param name 游戏id
     * @param code 数据存取id
     */
    async pullData(code: string): Promise<string> {
        let id = "", password = "";
        if (code.length === 7 && /^\d{4}\w{3}$/.test(code)) {
            id = code.substring(0, 4);
            password = code.substring(4, 7); 
        } else if (code.length === 10 && /^\d{6}\w{4}$/.test(code)) {
            id = code.substring(0, 6);
            password = code.substring(6, 4); 
        } else {
            throw Error("id格式错误");
        }
        const { data } = await axios
            .post<{ msg: string }>("/games/sync.php", createFormData({
                type: "load",
                name: TOWER_ID,
                id,
                password,
            }));
        return data.msg;
    }

    /**
     * 打开评论区
     */
    openTowerHome() {
        window.open(`/tower?name=${ TOWER_ID }`);
    }

    /**
     * 
     */
    
}

export const websiteSDK = new WebsiteSDK();