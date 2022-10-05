"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationNode = void 0;
const import_manager_js_1 = require("../import-manager.js");
const ElectronicaGame_js_1 = require("../ElectronicaGame.js");
class AnimationNode extends import_manager_js_1.RenderNode {
    constructor(data) {
        var _a;
        super(data);
        this.imageName = data.imageName;
        this.frameMillis = data.frameMillis;
        this.lastRenderTime = 0;
        this.currentFrame = 0;
        this.loops = (_a = data.loops) !== null && _a !== void 0 ? _a : true;
        const img = ElectronicaGame_js_1.gameData.images.byKey[this.imageName];
        this.frames = Math.floor(img.width / data.w);
        this.totalMillis = this.frameMillis * this.frames;
    }
    /** Updates the currentFrame and lastRenderTime, and returns the new frame number */
    updateFrame(renderTime) {
        this.lastRenderTime = renderTime;
        this.currentFrame += 1;
        if (this.currentFrame >= this.frames) {
            if (this.loops) {
                this.currentFrame = 0;
            }
            else {
                this.currentFrame = this.frames - 1;
            }
        }
        return this.currentFrame;
    }
}
exports.AnimationNode = AnimationNode;
//# sourceMappingURL=AnimationNode.js.map