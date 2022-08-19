const SUPPORT_COPY = document.queryCommandSupported && document.queryCommandSupported("copy");

/**
 * 
 * @param data 
 * @returns 
 */
export function addToClipboard(data: string) {
    // @ts-ignore
    if (window.jsinterface) {
        // @ts-ignore
        window.jsinterface.copy(data);
        return true;
    }

    if (!SUPPORT_COPY) {
        return false;
    }

    const textArea = document.createElement("textarea");
    textArea.style.display = 'none';
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.setSelectionRange(0, textArea.value.length);
    let successful = false;
    try {
        successful = document.execCommand('copy');
    } catch (err) {
        successful = false;
    }

    document.body.removeChild(textArea);
    return successful;
}
