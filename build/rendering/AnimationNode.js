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
        this.currentFrame = -1;
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
    /** Sets the lastRenderTime and currentFrame to 0. Good for resetting non-looping animations */
    reset() {
        this.lastRenderTime = 0;
        this.currentFrame = -1;
    }
}
exports.AnimationNode = AnimationNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3JlbmRlcmluZy9BbmltYXRpb25Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUFrRTtBQUNsRSw4REFBaUQ7QUFhakQsTUFBYSxhQUFjLFNBQVEsOEJBQVU7SUFTekMsWUFBWSxJQUF1Qjs7UUFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxtQ0FBSSxJQUFJLENBQUM7UUFFaEMsTUFBTSxHQUFHLEdBQUcsNkJBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdEQsQ0FBQztJQUVELG9GQUFvRjtJQUNwRixXQUFXLENBQUMsVUFBa0I7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDdkM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsK0ZBQStGO0lBQy9GLEtBQUs7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQXpDRCxzQ0F5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW5kZXJOb2RlLCBSZW5kZXJOb2RlRGF0YSB9IGZyb20gJy4uL2ltcG9ydC1tYW5hZ2VyLmpzJztcclxuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi9FbGVjdHJvbmljYUdhbWUuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uTm9kZURhdGEgPSBSZW5kZXJOb2RlRGF0YSAmIHtcclxuICAgIGltYWdlTmFtZTogc3RyaW5nO1xyXG4gICAgLyoqIFByb3ZpZGUgdGhlIHdpZHRoIG9mIGEgc2luZ2xlIGZyYW1lLCBub3QgdGhlIHdob2xlIGltYWdlLiBOb3Qgb3B0aW9uYWwgYmVjYXVzZSB3ZSB1c2VkIGl0IHRvIGNhbGN1bGF0ZSB0aGluZ3MuICovXHJcbiAgICB3OiBudW1iZXI7XHJcbiAgICAvKiogUmVxdWlyZWQgKi9cclxuICAgIGg6IG51bWJlcjtcclxuICAgIGZyYW1lTWlsbGlzOiBudW1iZXI7XHJcbiAgICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSAqL1xyXG4gICAgbG9vcHM/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uTm9kZSBleHRlbmRzIFJlbmRlck5vZGUge1xyXG4gICAgaW1hZ2VOYW1lOiBzdHJpbmc7XHJcbiAgICBmcmFtZU1pbGxpczogbnVtYmVyO1xyXG4gICAgZnJhbWVzOiBudW1iZXI7XHJcbiAgICB0b3RhbE1pbGxpczogbnVtYmVyO1xyXG4gICAgbGFzdFJlbmRlclRpbWU6IG51bWJlcjtcclxuICAgIGN1cnJlbnRGcmFtZTogbnVtYmVyO1xyXG4gICAgbG9vcHM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogQW5pbWF0aW9uTm9kZURhdGEpIHtcclxuICAgICAgICBzdXBlcihkYXRhKTtcclxuICAgICAgICB0aGlzLmltYWdlTmFtZSA9IGRhdGEuaW1hZ2VOYW1lO1xyXG4gICAgICAgIHRoaXMuZnJhbWVNaWxsaXMgPSBkYXRhLmZyYW1lTWlsbGlzO1xyXG4gICAgICAgIHRoaXMubGFzdFJlbmRlclRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEZyYW1lID0gLTE7XHJcbiAgICAgICAgdGhpcy5sb29wcyA9IGRhdGEubG9vcHMgPz8gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1nID0gZ2FtZURhdGEuaW1hZ2VzLmJ5S2V5W3RoaXMuaW1hZ2VOYW1lXTtcclxuICAgICAgICB0aGlzLmZyYW1lcyA9IE1hdGguZmxvb3IoaW1nLndpZHRoIC8gZGF0YS53KTtcclxuICAgICAgICB0aGlzLnRvdGFsTWlsbGlzID0gdGhpcy5mcmFtZU1pbGxpcyAqIHRoaXMuZnJhbWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBVcGRhdGVzIHRoZSBjdXJyZW50RnJhbWUgYW5kIGxhc3RSZW5kZXJUaW1lLCBhbmQgcmV0dXJucyB0aGUgbmV3IGZyYW1lIG51bWJlciAqL1xyXG4gICAgdXBkYXRlRnJhbWUocmVuZGVyVGltZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLmxhc3RSZW5kZXJUaW1lID0gcmVuZGVyVGltZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSArPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRGcmFtZSA+PSB0aGlzLmZyYW1lcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb29wcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSB0aGlzLmZyYW1lcyAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEZyYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBTZXRzIHRoZSBsYXN0UmVuZGVyVGltZSBhbmQgY3VycmVudEZyYW1lIHRvIDAuIEdvb2QgZm9yIHJlc2V0dGluZyBub24tbG9vcGluZyBhbmltYXRpb25zICovXHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmxhc3RSZW5kZXJUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IC0xOyAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=