"use strict";
/**
 * Nice functions to help detect and set the size of your chunky pixels relative to the
 * player's current resolution and OS scaling
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScreenInfo = void 0;
/** Get basic info about the game window */
function getScreenInfo() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
    };
}
exports.getScreenInfo = getScreenInfo;
//# sourceMappingURL=display-helpers.js.map