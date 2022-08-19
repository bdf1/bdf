import { BlobReader, Entry, ZipReader } from "@zip.js/zip.js";
import axios from "axios";
import { ProgressHandler } from ".";

export async function loadByGet(url: string, progress: ProgressHandler) {
    return axios.get<Blob>(`${ url }?v=${ main.version }`, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent: ProgressEvent) => {
            const { loaded, total } = progressEvent;
            progress(loaded, total);
        }
    });
}

export async function unzip(data: Blob, entryHandler: (entry: Entry) => Promise<void>) {
    const reader = new ZipReader(new BlobReader(data));
    const entries = await reader.getEntries();
    await Promise.all(entries.map((entry) => {
        return new Promise<void>((res) => {
            setTimeout(async() => {
                await entryHandler(entry);
                res();
            });
        });
    }));
}