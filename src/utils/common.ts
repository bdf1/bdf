import { isUndefined } from "lodash-es";

/** 格式化文件大小 */
export function formatSize(size: number) {
    if (size < 1024)
        return size + 'B';
    else if (size < 1024 * 1024)
        return (size / 1024).toFixed(2) + "KB";
    else
        return (size / 1024 / 1024).toFixed(2) + "MB";
}

export function encodeBase64(str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    }));
}

export function decodeBase64(str: string) {
    return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export async function sleep(time = 0) {
    return new Promise<void>((res) => {
        setTimeout(() => res(), time);
    })
}

export function packToArray<T>(e: T | T[]) {
    if (!Array.isArray(e)) return [ e ];
    else return e;
} 
