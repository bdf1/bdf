export function attachCSS(cssText: string): () => void {
    const style = document.createElement("style");
    style.innerHTML = cssText;
    document.body.appendChild(style);
    return () => {
        style.remove();
    };
}