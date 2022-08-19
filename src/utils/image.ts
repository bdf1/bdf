export async function createImageFromBlob(data: Blob) {
    const img = new Image();
    const url = URL.createObjectURL(data);
    return new Promise<HTMLImageElement>((res) => {
        img.onload = () => {
            URL.revokeObjectURL(url);
            img.setAttribute('_width', img.width.toString());
            img.setAttribute('_height', img.height.toString());
            res(img);
        }
        img.src = url;
    })
}