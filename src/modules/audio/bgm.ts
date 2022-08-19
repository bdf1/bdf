import { readonly, ref, Ref } from "vue";
import { Config } from "../storage/config";

interface BGMContext {
    name: string
    speed: number
    volume: number
    usePitch: boolean
}

interface BGMTask extends BGMContext {
    /** 音乐的开始时间，默认为-1，即对于未播放的音乐代表0，对于正在播放的音乐代表不改动 */
    time: number
}

interface BGMStatus extends BGMTask {
    playing: boolean
}

class BGMPlayer {

    private bgms: Record<string, HTMLAudioElement> = {};

    /**
     * 添加播放列表
     * @param bgmList 
     */
    addPlaylist(bgmList: [ string, string ][]) {
        bgmList.forEach(([ name, url ]) => {
            this.addOne(name, url);
        })
    }

    /**
     * 
     * @param name 
     * @param url 
     */
    private addOne(name: string, url: string) {
        const music = new Audio();
        music.preload = 'none';
        music.src = url;
        // @ts-ignore
        music.loop = 'loop';
        this.bgms[name] = music;
    }

    private currentBGM: BGMStatus | null = null;

    private _config = new Config("bgm", {
        muted: false,
        volume: 70
    });

    /**
     * 获取[BGM是否静音]的值
     */
    get muted() {
        return this._config.get("muted");
    }

    /**
     * 获取[BGM是否静音]的只读引用
     */
    getMutedRef() {
        return readonly(this._config.getRef("muted"));
    }

    /**
     * 设置[BGM是否静音]
     * @param muted 
     */
    setMuted(muted: boolean) {
        if (muted !== this.muted) {
            this._config.set("muted", muted);
            if (muted) {
                this.pause();
            } else {
                this.resume();
            }
        }
    }

    /**
     * 用户设置的音量
     */
    get volume() {
        return this._config.get("volume");
    }

    /**
     * 获取[BGM音量]的只读引用
     */
    getVolumeRef() {
        return readonly(this._config.getRef("volume"));
    }
    
    /**
     * 设置[BGM音量]
     * @param volume 
     */
    setVolume(volume: number) {
        if (volume !== this.volume) {
            this._config.set("volume", volume);
            this.updateVolume();
        }
    }
    
    private static readonly DEFAULT_BGM_CONTEXT: BGMContext = {
        name: "",
        speed: 100,
        volume: 100,
        usePitch: false,
    }

    /**
     * 播放背景音乐
     * @param name 音乐名称
     * @param option
     * @returns 
     */
    play(name: string, option: Partial<BGMTask>) {
        if (!this.bgms[name]) {
            console.error(`[BGMPlayer] 尝试播放不存在的音乐 "${ name }"`);
            return;
        }
        const context: BGMTask = {
            ...BGMPlayer.DEFAULT_BGM_CONTEXT,
            time: -1,
            ...option,
            name,
        }

        try {
            this._applyTask(context);
        } catch (e) {
            console.error(`[BGMPlayer] 无法播放BGM "${ name }"`);
            this.currentBGM = null;
        }
    }

    private _applyTask(task: BGMTask) {
        // 如果当前其他BGM正在播放，则需要停止
        if (this.currentBGM && this.currentBGM.name !== task.name) {
            this.bgms[this.currentBGM.name].pause();
        }
        this.addToCache(task.name);
        const bgm = this.bgms[task.name];
        if (task.time !== -1) {
            bgm.currentTime = task.time;
        } else {
            if (this.currentBGM && this.currentBGM.name === task.name) {
                // 当前正在播放音乐时，-1代表不做改动
            } else {
                bgm.currentTime = 0;
            }
        }
        // 由于applyContext为差分更新，因此要先赋值为不可能的值
        this.currentBGM = {
            name: task.name, time: -1, speed: -1, volume: -1, usePitch: false, playing: true
        }
        this._applyContext(task);
        // 静音时不播放
        if (!this.muted) {
            bgm.play();
        }
    }

    /**
     * 设置BGM的播放速度和音调
     * @param speed 
     * @param usePitch 
     */
    setSpeed(speed: number, usePitch?: boolean) {
        this._applyContext({ speed, usePitch });
    }

    /**
     * 对当前正在播放的音乐应用BGM上下文
     * @param context 
     */
    private _applyContext(context: Partial<BGMContext>) {
        if (!this.currentBGM) {
            return;
        }
        const bgm = this.bgms[this.currentBGM.name];
        if (context.volume) {
            this.currentBGM.volume = context.volume;
            this.updateVolume();
        }
        if (context.speed) {
            const speed = context.speed;
            if (speed < 30 || speed > 300) {
                console.warn(`[BGMPlayer] 音乐播放速度必须在[30, 300]之间，当前为"${ speed }"`);
            }
            bgm.playbackRate = speed / 100;
            this.currentBGM.speed = context.speed;
            this.currentBGM.usePitch = context.usePitch ?? this.currentBGM.usePitch;
        
            if (context != null) {
                // @ts-ignore
                bgm.preservesPitch = this.currentBGM.usePitch;
            }
        }
    }

    private updateVolume() {
        if (!this.currentBGM) {
            return;
        }
        const bgm = this.bgms[this.currentBGM.name];
        bgm.volume = this.volume / 100 * this.currentBGM.volume / 100;
    }

    preload(name: string) {
        if (!this.bgms[name]) {
            console.error(`[BGMPlayer] 尝试预加载不存在的音乐 "${ name }"`);
            return;
        }
        // 如果没开启音乐，则不预加载
        if (this.muted) return;
        if (!this.addToCache(name)) {
            // 预加载BGM
            this._preload(name);
        }
    }

    private _preload(name: string) {
        const bgm = this.bgms[name];
        bgm.volume = 0;
        bgm.play();
    }
    
    private static readonly BGM_CACHE_SIZE = 5;
    private BGMCache: string[] = [];
    
    private addToCache(name: string): boolean {
        // 是否已经预加载过
        const hitted = (() => {
            const index = this.BGMCache.indexOf(name);
            if (index >= 0) {
                this.BGMCache.splice(index, 1);
                return true;
            } else {
                // 清理尾巴
                if (this.BGMCache.length == BGMPlayer.BGM_CACHE_SIZE) {
                    this._free(this.BGMCache.pop() as string);
                }
                return false;
            }
        })();
        // 移动到缓存最前方
        this.BGMCache.unshift(name);
        return hitted;
    }

    free(name: string) {
        if (!this.bgms[name]) {
            console.error(`[BGMPlayer] 尝试释放不存在的音乐 "${ name }"`);
            return;
        }
        if (name === this.currentBGM?.name) {
            this.currentBGM = null;
        }
    }

    private _free(name: string) {
        // 如果不在cache中则不需要释放
        if (!this.BGMCache.includes(name)) {
            // 从BGMCache中删除
            this.BGMCache = this.BGMCache.filter((e) => e !== name);
        }
        // 清掉缓存
        const src = this.bgms[name].src;
        this.bgms[name].removeAttribute("src");
        this.bgms[name].load();
        // @ts-ignore
        this.bgms[name] = null;
        // 三秒后重新加载
        setTimeout(() => {
            this.addOne(name, src);
        }, 3000);
    }
    
    /**
     * 暂停背景音乐的播放
     */
    pause() {
        if (this.currentBGM === null || !this.currentBGM.playing) {
            return;
        }
        try {
            const bgm = this.bgms[this.currentBGM.name];
            bgm.pause();
            this.currentBGM.playing = false;
            this.currentBGM.time = bgm.currentTime;
        } catch (e) {
            console.error(`[BGMPlayer] 无法暂停BGM "${ this.currentBGM.name }"`);
        }
    }

    /**
     * 恢复背景音乐的播放
     */
    resume() {
        if (!this.currentBGM) {
            return;
        }
        try {
            this._applyTask({ ...this.currentBGM });
        } catch (e) {
            console.error(`[BGMPlayer] 无法恢复BGM "${ this.currentBGM.name }"`);
        }
    }
}

export const bgmPlayer = new BGMPlayer();