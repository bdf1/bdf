import { BlobReader } from "@zip.js/zip.js";
import { readonly } from "vue";
import { Config } from "../storage/config";

// @ts-ignore
window.AudioContext = window.AudioContext ?? window.webkitAudioContext ?? window.mozAudioContext ?? window.msAudioContext;

export interface SEOption {
    volume: number
    pitch: number
}

class SEPlayer {

    private soundEffects: Record<string, AudioBuffer> = {};

    private playingSEs = new Map<number, [ string, AudioBufferSourceNode ]>();

    private audioContext: AudioContext | null;

    constructor() {
        if (window.AudioContext) {
            this.audioContext = new AudioContext();
        } else {
            this.audioContext = null;
            console.log(`[SEPlayer] 该浏览器不支持AudioContext`);
        }
    }

    async load(filename: string, buffer: ArrayBufferLike | Blob) {
        if (!this.audioContext) return;
        if (buffer instanceof Blob) {
            const blobReader = new BlobReader(buffer);
            await blobReader.init!();
            const uint8Array = await blobReader.readUint8Array(0, blobReader.size);
            buffer = uint8Array.buffer;
        }
        const audioBuffer = await this.audioContext.decodeAudioData(buffer);
        this.soundEffects[filename] = audioBuffer;
    }

    private _config = new Config("se", {
        muted: false,
        volume: 70
    });

    /**
     * 获取[SE是否静音]的值
     */
    get muted() {
        return this._config.get("muted");
    }

    /**
     * 获取[SE是否静音]的只读引用
     */
    getMutedRef() {
        return readonly(this._config.getRef("muted"));
    }

    /**
     * 设置[SE是否静音]
     * @param muted 
     */
    setMuted(muted: boolean) {
        if (muted !== this.muted) {
            this._config.set("muted", muted);
        }
    }

    /**
     * 用户设置的音量
     */
    get volume() {
        return this._config.get("volume");
    }

    /**
     * 获取[SE音量]的只读引用
     */
    getVolumeRef() {
        return readonly(this._config.getRef("volume"));
    }
    
    /**
     * 设置[SE音量]
     * @param volume 
     */
    setVolume(volume: number) {
        if (volume !== this.volume) {
            this._config.set("volume", volume);
        }
    }

    private seId = 0;

    /**
     * 播放音频
     */
    play(name: string, { volume, pitch }: Partial<SEOption> = {}): [ number, Promise<void> ] {
        if (!this.soundEffects[name]) {
            console.error(`[SEPlayer] 尝试播放不存在的音效 "${ name }"`);
            return [ -1, Promise.resolve() ];
        }
        if (this.muted) {
            return [ -1, Promise.resolve() ];
        }
        if (!this.audioContext) {
            /**
             * @todo 兼容Audio
             */
            return [ -1, Promise.resolve() ];
        }
        const source = this.audioContext.createBufferSource();
        source.buffer = this.soundEffects[name];
        const gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        if (volume) {
            gainNode.gain.value = volume / 100;
        }
        if (pitch) {
            if (pitch < 30 || pitch > 300) {
                console.warn(`[SEPlayer] 音调必须在[30, 300]之间，当前为"${ pitch }"`);
            }
            source.playbackRate.setValueAtTime(pitch / 100, 0);
        }
        const id = this.seId++;
        return [ id, new Promise<void>((res) => {
            source.onended = () => {
                this.playingSEs.delete(id);
                gainNode.disconnect();
                res();
            }
            this.playingSEs.set(id, [ name, source ]);
            if (source.start) source.start(0);
            // @ts-ignore
            else if (source.noteOn) source.noteOn(0);
        }) ];
    }

    /**
     * 根据id停止音频
     */
    stop(id: number) {
        if (id === -1) return;
        const item = this.playingSEs.get(id);
        if (!item) {
            console.error(`[SEPlayer] 尝试停止一个未被播放的音效 "${ id }"`);
            return;
        }
        const [ name, source ] = item;
        try {
            if (source.stop) source.stop();
            // @ts-ignore
            else if (source.noteOff) source.noteOff();
            // @ts-ignore
            source.onended();
        } catch (e) {
            console.error(`[SEPlayer] 停止音效失败 "${ id }: ${ name }"`);
        }
    }
    
    /**
     * 停止所有音频
     */
    stopAll() {
        this.playingSEs.forEach((sound, id) => {
            this.stop(id);
        });
    }

    /**
     * 获得当前正在播放的所有（指定）音效的id列表
     * @param name 指定音效名称
     * @returns 
     */
    getPlayingSEs(name?: string) {
        let list = Array.from(this.playingSEs.entries());
        if (name) {
            list = list.filter(([ id, [ name ] ]) => name === name)
        }
        return list.map(([ id ]) => id);
    }
}

export const sePlayer = new SEPlayer();
