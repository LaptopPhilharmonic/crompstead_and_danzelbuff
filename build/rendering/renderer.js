"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const import_manager_js_1 = require("../import-manager.js");
const ElectronicaGame_js_1 = require("../ElectronicaGame.js");
const displayHelpers = __importStar(require("../util/display-helpers"));
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        const possibleContext = this.canvas.getContext('2d');
        if (possibleContext === null) {
            throw new Error('Could not get 2D context for <canvas> element');
        }
        this.context = possibleContext;
        this.context.imageSmoothingEnabled = ElectronicaGame_js_1.gameData.globals.imageSmoothing;
        this.devicePixelRatio = ElectronicaGame_js_1.gameData.globals.screenInfo.devicePixelRatio;
        window.addEventListener('resize', () => {
            this.handleCanvasResize();
        });
    }
    /** Take care of resizing of the canvas */
    handleCanvasResize() {
        ElectronicaGame_js_1.gameData.globals.screenInfo = displayHelpers.getScreenInfo();
        const dpr = ElectronicaGame_js_1.gameData.globals.screenInfo.devicePixelRatio;
        this.canvas.width = ElectronicaGame_js_1.gameData.globals.screenInfo.width * dpr;
        this.canvas.height = ElectronicaGame_js_1.gameData.globals.screenInfo.height * dpr;
        this.canvas.style.width = (ElectronicaGame_js_1.gameData.globals.screenInfo.width) + 'px';
        this.canvas.style.height = (ElectronicaGame_js_1.gameData.globals.screenInfo.height) + 'px';
        this.context.imageSmoothingEnabled = ElectronicaGame_js_1.gameData.globals.imageSmoothing;
    }
    /**
     * The main scene rendering function. Renders all on-screen RenderNodes in scene supplied as viewed by the camera supplied
     */
    renderScene(scene, camera) {
        const renderTime = new Date().valueOf();
        this.context.save();
        this.context.translate(camera.x * -1, camera.y * -1);
        if (camera.zoom > 1) {
            this.context.scale(camera.zoom, camera.zoom);
        }
        scene.renderNodes.forEach((renderNode) => {
            this.renderNode(renderNode, renderTime, camera);
        });
        this.context.restore();
    }
    /**
     * Work out what kind of node this is and render it as appropriate
     */
    renderNode(node, renderTime, camera) {
        if (node instanceof import_manager_js_1.ImageNode) {
            this.renderImageNode(node);
        }
        if (node instanceof import_manager_js_1.AnimationNode) {
            this.renderAnimationNode(node, renderTime);
        }
        node.forEachChild((childNode) => {
            this.renderNode(childNode, renderTime, camera);
        });
    }
    /**
     * Draw an ImageNode to the canvas
     */
    renderImageNode(node) {
        const image = ElectronicaGame_js_1.gameData.images.byKey[node.imageName];
        if (image) {
            const w = node.autoWidth ? image.width : node.w;
            const h = node.autoHeight ? image.height : node.h;
            this.context.drawImage(image, node.x + node.offsetX, node.y + node.offsetY, w, h);
        }
    }
    /**
     * Draw an AnimationNode to the canvas
     */
    renderAnimationNode(node, renderTime) {
        const image = ElectronicaGame_js_1.gameData.images.byKey[node.imageName];
        if (image && renderTime - node.lastRenderTime > node.frameMillis) {
            node.updateFrame(renderTime);
        }
        this.context.drawImage(image, node.currentFrame * node.w, 0, node.w, node.h, node.x + node.offsetX, node.y + node.offsetY, node.w, node.h);
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yZW5kZXJpbmcvUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw0REFBNEU7QUFDNUUsOERBQWlEO0FBQ2pELHdFQUEwRDtBQUUxRCxNQUFhLFFBQVE7SUFLakIsWUFBWSxNQUF5QjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyw2QkFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLDZCQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVyRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsa0JBQWtCO1FBQ2QsNkJBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3RCxNQUFNLEdBQUcsR0FBRyw2QkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsNkJBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtB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LENBQUM7U0FDckY7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUIsQ0FBQyxJQUFtQixFQUFFLFVBQWtCO1FBQ3ZELE1BQU0sS0FBSyxHQUFHLDZCQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxLQUFLLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0ksQ0FBQztDQUNKO0FBdEZELDRCQXNGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjZW5lIH0gZnJvbSAnLi4vaW1wb3J0LW1hbmFnZXIuanMnO1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuLi9pbXBvcnQtbWFuYWdlci5qcyc7XHJcbmltcG9ydCB7IFJlbmRlck5vZGUsIEltYWdlTm9kZSwgQW5pbWF0aW9uTm9kZSB9IGZyb20gJy4uL2ltcG9ydC1tYW5hZ2VyLmpzJztcclxuaW1wb3J0IHsgZ2FtZURhdGEgfSBmcm9tICcuLi9FbGVjdHJvbmljYUdhbWUuanMnO1xyXG5pbXBvcnQgKiBhcyBkaXNwbGF5SGVscGVycyBmcm9tICcuLi91dGlsL2Rpc3BsYXktaGVscGVycyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xyXG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGRldmljZVBpeGVsUmF0aW86IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgY29uc3QgcG9zc2libGVDb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZiAocG9zc2libGVDb250ZXh0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGdldCAyRCBjb250ZXh0IGZvciA8Y2FudmFzPiBlbGVtZW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHBvc3NpYmxlQ29udGV4dDtcclxuICAgICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZ2FtZURhdGEuZ2xvYmFscy5pbWFnZVNtb290aGluZztcclxuICAgICAgICB0aGlzLmRldmljZVBpeGVsUmF0aW8gPSBnYW1lRGF0YS5nbG9iYWxzLnNjcmVlbkluZm8uZGV2aWNlUGl4ZWxSYXRpbztcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW52YXNSZXNpemUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGFrZSBjYXJlIG9mIHJlc2l6aW5nIG9mIHRoZSBjYW52YXMgKi9cclxuICAgIGhhbmRsZUNhbnZhc1Jlc2l6ZSgpIHtcclxuICAgICAgICBnYW1lRGF0YS5nbG9iYWxzLnNjcmVlbkluZm8gPSBkaXNwbGF5SGVscGVycy5nZXRTY3JlZW5JbmZvKCk7XHJcbiAgICAgICAgY29uc3QgZHByID0gZ2FtZURhdGEuZ2xvYmFscy5zY3JlZW5JbmZvLmRldmljZVBpeGVsUmF0aW87XHJcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSBnYW1lRGF0YS5nbG9iYWxzLnNjcmVlbkluZm8ud2lkdGggKiBkcHI7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gZ2FtZURhdGEuZ2xvYmFscy5zY3JlZW5JbmZvLmhlaWdodCAqIGRwcjtcclxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IChnYW1lRGF0YS5nbG9iYWxzLnNjcmVlbkluZm8ud2lkdGgpICsgJ3B4JztcclxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAoZ2FtZURhdGEuZ2xvYmFscy5zY3JlZW5JbmZvLmhlaWdodCkgKyAncHgnO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBnYW1lRGF0YS5nbG9iYWxzLmltYWdlU21vb3RoaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1haW4gc2NlbmUgcmVuZGVyaW5nIGZ1bmN0aW9uLiBSZW5kZXJzIGFsbCBvbi1zY3JlZW4gUmVuZGVyTm9kZXMgaW4gc2NlbmUgc3VwcGxpZWQgYXMgdmlld2VkIGJ5IHRoZSBjYW1lcmEgc3VwcGxpZWRcclxuICAgICAqL1xyXG4gICAgcmVuZGVyU2NlbmUoc2NlbmU6IFNjZW5lLCBjYW1lcmE6IENhbWVyYSkge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlclRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoY2FtZXJhLnggKiAtMSwgY2FtZXJhLnkgKiAtMSk7XHJcbiAgICAgICAgaWYgKGNhbWVyYS56b29tID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2NhbGUoY2FtZXJhLnpvb20sIGNhbWVyYS56b29tKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjZW5lLnJlbmRlck5vZGVzLmZvckVhY2goKHJlbmRlck5vZGU6IFJlbmRlck5vZGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOb2RlKHJlbmRlck5vZGUsIHJlbmRlclRpbWUsIGNhbWVyYSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXb3JrIG91dCB3aGF0IGtpbmQgb2Ygbm9kZSB0aGlzIGlzIGFuZCByZW5kZXIgaXQgYXMgYXBwcm9wcmlhdGVcclxuICAgICAqL1xyXG4gICAgcmVuZGVyTm9kZShub2RlOiBSZW5kZXJOb2RlLCByZW5kZXJUaW1lOiBudW1iZXIsIGNhbWVyYTogQ2FtZXJhKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBJbWFnZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJbWFnZU5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQW5pbWF0aW9uTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckFuaW1hdGlvbk5vZGUobm9kZSwgcmVuZGVyVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUuZm9yRWFjaENoaWxkKChjaGlsZE5vZGU6IFJlbmRlck5vZGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJOb2RlKGNoaWxkTm9kZSwgcmVuZGVyVGltZSwgY2FtZXJhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYW4gSW1hZ2VOb2RlIHRvIHRoZSBjYW52YXNcclxuICAgICAqL1xyXG4gICAgcmVuZGVySW1hZ2VOb2RlKG5vZGU6IEltYWdlTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gZ2FtZURhdGEuaW1hZ2VzLmJ5S2V5W25vZGUuaW1hZ2VOYW1lXTtcclxuICAgICAgICBpZiAoaW1hZ2UpIHtcclxuICAgICAgICAgICAgY29uc3QgdyA9IG5vZGUuYXV0b1dpZHRoID8gaW1hZ2Uud2lkdGggOiBub2RlLnc7XHJcbiAgICAgICAgICAgIGNvbnN0IGggPSBub2RlLmF1dG9IZWlnaHQgPyBpbWFnZS5oZWlnaHQgOiBub2RlLmg7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIG5vZGUueCArIG5vZGUub2Zmc2V0WCwgbm9kZS55ICsgbm9kZS5vZmZzZXRZLCB3LCBoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGFuIEFuaW1hdGlvbk5vZGUgdG8gdGhlIGNhbnZhc1xyXG4gICAgICovXHJcbiAgICByZW5kZXJBbmltYXRpb25Ob2RlKG5vZGU6IEFuaW1hdGlvbk5vZGUsIHJlbmRlclRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gZ2FtZURhdGEuaW1hZ2VzLmJ5S2V5W25vZGUuaW1hZ2VOYW1lXTtcclxuICAgICAgICBpZiAoaW1hZ2UgJiYgcmVuZGVyVGltZSAtIG5vZGUubGFzdFJlbmRlclRpbWUgPiBub2RlLmZyYW1lTWlsbGlzKSB7XHJcbiAgICAgICAgICAgIG5vZGUudXBkYXRlRnJhbWUocmVuZGVyVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIG5vZGUuY3VycmVudEZyYW1lICogbm9kZS53LCAwLCBub2RlLncsIG5vZGUuaCwgbm9kZS54ICsgbm9kZS5vZmZzZXRYLCBub2RlLnkgKyBub2RlLm9mZnNldFksIG5vZGUudywgbm9kZS5oKTtcclxuICAgIH1cclxufSJdfQ==