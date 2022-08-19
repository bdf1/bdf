export function createCTX() {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) {
        throw new Error();
    }
    return ctx;
}