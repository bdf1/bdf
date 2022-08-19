
class Platform {

    string: string
    /** 是否http */isOnline: boolean
    /** 是否是PC */isPC: boolean
    /** 是否是Android */isAndroid: boolean
    /** 是否是iOS */isIOS: boolean
    /** 是否是Safari */isSafari: boolean
    /** 是否是微信 */isWeChat: boolean
    /** 是否是QQ */isQQ: boolean
    /** 是否是Chrome */isChrome: boolean
    isFirefox: boolean
    isWebKit: boolean
    isWebkitWebView: any
    isEdgeLegacyWebView: boolean
    isElectron: boolean
    isStandalone: boolean
    isMacintosh: boolean

    constructor() {
        const userAgent = navigator.userAgent;
        this.isOnline = location.protocol.indexOf("http") === 0;
        if (!this.isOnline) {
            alert("请勿直接打开html文件！使用启动服务或者APP进行离线游戏。");
        }
        this.isPC = true;
        this.isAndroid = false;
        this.isIOS = false;
        ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"].forEach((t) => {
            if (userAgent.includes(t)) {
                if (t === 'iPhone' || t === 'iPad' || t === 'iPod') this.isIOS = true;
                if (t === 'Android') this.isAndroid = true;
                this.isPC = false;
            }
        });
        this.string = this.isPC ? "PC" : this.isAndroid ? "Android" : this.isIOS ? "iOS" : "";
        const chrome = /Chrome\/(\d+)\./i.exec(userAgent);
        this.isChrome = chrome !== null && parseInt(chrome[1]) >= 50;
        this.isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
        this.isQQ = /QQ/i.test(userAgent);
        this.isWeChat = /MicroMessenger/i.test(userAgent);

        this.isFirefox = (userAgent.indexOf('Firefox') >= 0);
        this.isWebKit = (userAgent.indexOf('AppleWebKit') >= 0);
        // this.isChrome = (userAgent.indexOf('Chrome') >= 0);
        // this.isSafari = (!isChrome && (userAgent.indexOf('Safari') >= 0));
        this.isWebkitWebView = (!this.isChrome && !this.isSafari && this.isWebKit);
        this.isEdgeLegacyWebView = (userAgent.indexOf('Edge/') >= 0) && (userAgent.indexOf('WebView/') >= 0);
        this.isElectron = (userAgent.indexOf('Electron/') >= 0);
        // this.isAndroid = (userAgent.indexOf('Android') >= 0);
        this.isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
        this.isMacintosh = userAgent.indexOf('Macintosh') >= 0;
    }
}

export const platform = new Platform();
