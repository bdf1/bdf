// LZW-compress
// https://gist.github.com/revolunet/843889
// add some type declares because of lint
function lzw_encode(s: string) {
    const dict: Record<string, number> = {};
    const data = (s + "").split("");
    const out: number[] = [];
    let currChar: string;
    let phrase = data[0];
    let code = 256;
    for (let i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase = currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    const ret = Array(out.length);
    for (let i = 0; i < out.length; i++) {
        ret[i] = String.fromCharCode(out[i]);
    }
    return ret.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s: string) {
    const dict: Record<string, string> = {};
    const data = (s + "").split("");
    let currChar = data[0];
    let oldPhrase = currChar;
    const out = [currChar];
    let code = 256;
    let phrase: string;
    for (let i = 1; i < data.length; i++) {
        const currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

