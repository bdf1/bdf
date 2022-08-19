/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { platform } from "@/modules/client/platform";
import { EVENT_KEY_CODE_MAP, KeyCode, KeyCodeUtils, KeyMod } from "./keycode";

function extractKeyCode(e: KeyboardEvent): KeyCode {
	if (e.charCode) {
		// "keypress" events mostly
		let char = String.fromCharCode(e.charCode).toUpperCase();
		return KeyCodeUtils.fromString(char);
	}

	const keyCode = e.keyCode;

	// browser quirks
	if (keyCode === 3) {
		return KeyCode.PauseBreak;
	} else if (platform.isFirefox) {
		if (keyCode === 59) {
			return KeyCode.Semicolon;
		} else if (keyCode === 107) {
			return KeyCode.Equal;
		} else if (keyCode === 109) {
			return KeyCode.Minus;
		} else if (platform.isMacintosh && keyCode === 224) {
			return KeyCode.Meta;
		}
	} else if (platform.isWebKit) {
		if (keyCode === 91) {
			return KeyCode.Meta;
		} else if (platform.isMacintosh && keyCode === 93) {
			// the two meta keys in the Mac have different key codes (91 and 93)
			return KeyCode.Meta;
		} else if (!platform.isMacintosh && keyCode === 92) {
			return KeyCode.Meta;
		}
	}

	// cross browser keycodes:
	return EVENT_KEY_CODE_MAP[keyCode] || KeyCode.Unknown;
}

const ctrlKeyMod = KeyMod.Ctrl;
// (platform.isMacintosh ? KeyMod.WinCtrl : KeyMod.CtrlCmd);
const altKeyMod = KeyMod.Alt;
const shiftKeyMod = KeyMod.Shift;
const metaKeyMod = KeyMod.Ctrl;
// (platform.isMacintosh ? KeyMod.CtrlCmd : KeyMod.WinCtrl);

export function computeKeybinding(e: KeyboardEvent): number {
    const keyCode = extractKeyCode(e);
    const ctrlKey = e.ctrlKey || keyCode === KeyCode.Ctrl;
    const shiftKey = e.shiftKey || keyCode === KeyCode.Shift;
    const altKey = e.altKey || keyCode === KeyCode.Alt;
    const metaKey = e.metaKey || keyCode === KeyCode.Meta;
    const code = e.code;

    let key = KeyCode.Unknown;
    if (keyCode !== KeyCode.Ctrl && keyCode !== KeyCode.Shift && keyCode !== KeyCode.Alt && keyCode !== KeyCode.Meta) {
        key = keyCode;
    }

    let result = 0;
    if (ctrlKey) {
        result |= ctrlKeyMod;
    }
    if (altKey) {
        result |= altKeyMod;
    }
    if (shiftKey) {
        result |= shiftKeyMod;
    }
    if (metaKey) {
        result |= metaKeyMod;
    }
    result |= key;

    return result;
}
