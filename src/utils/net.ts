/**
 * 由对象创建FormData
 * @param data 
 * @returns 
 */
export function createFormData(data: Record<string, string>) {
    const formdata = new FormData();
    Object.entries(data).forEach(([ key, value ]) => {
        formdata.append(key, value);
    })
    return formdata;
}