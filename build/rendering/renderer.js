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
            if (renderNode.visible) {
                this.renderNode(renderNode, renderTime, camera);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yZW5kZXJpbmcvUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw0REFBNEU7QUFDNUUsOERBQWlEO0FBQ2pELHdFQUEwRDtBQUUxRCxNQUFhLFFBQVE7SUFLakIsWUFBWSxNQUF5QjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyw2QkFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLDZCQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVyRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsa0JBQWtCO1FBQ2QsNkJBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3RCxNQUFNLEdBQUcsR0FBRyw2QkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsNkJBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtB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QUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JGO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLENBQUMsSUFBbUIsRUFBRSxVQUFrQjtRQUN2RCxNQUFNLEtBQUssR0FBRyw2QkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksS0FBSyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9JLENBQUM7Q0FDSjtBQXhGRCw0QkF3RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4uL2ltcG9ydC1tYW5hZ2VyLmpzJztcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi4vaW1wb3J0LW1hbmFnZXIuanMnO1xyXG5pbXBvcnQgeyBSZW5kZXJOb2RlLCBJbWFnZU5vZGUsIEFuaW1hdGlvbk5vZGUgfSBmcm9tICcuLi9pbXBvcnQtbWFuYWdlci5qcyc7XHJcbmltcG9ydCB7IGdhbWVEYXRhIH0gZnJvbSAnLi4vRWxlY3Ryb25pY2FHYW1lLmpzJztcclxuaW1wb3J0ICogYXMgZGlzcGxheUhlbHBlcnMgZnJvbSAnLi4vdXRpbC9kaXNwbGF5LWhlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcclxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHByaXZhdGUgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSBkZXZpY2VQaXhlbFJhdGlvOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICAgIGNvbnN0IHBvc3NpYmxlQ29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYgKHBvc3NpYmxlQ29udGV4dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBnZXQgMkQgY29udGV4dCBmb3IgPGNhbnZhcz4gZWxlbWVudCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBwb3NzaWJsZUNvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGdhbWVEYXRhLmdsb2JhbHMuaW1hZ2VTbW9vdGhpbmc7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VQaXhlbFJhdGlvID0gZ2FtZURhdGEuZ2xvYmFscy5zY3JlZW5JbmZvLmRldmljZVBpeGVsUmF0aW87XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FudmFzUmVzaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRha2UgY2FyZSBvZiByZXNpemluZyBvZiB0aGUgY2FudmFzICovXHJcbiAgICBoYW5kbGVDYW52YXNSZXNpemUoKSB7XHJcbiAgICAgICAgZ2FtZURhdGEuZ2xvYmFscy5zY3JlZW5JbmZvID0gZGlzcGxheUhlbHBlcnMuZ2V0U2NyZWVuSW5mbygpO1xyXG4gICAgICAgIGNvbnN0IGRwciA9IGdhbWVEYXRhLmdsb2JhbHMuc2NyZWVuSW5mby5kZXZpY2VQaXhlbFJhdGlvO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gZ2FtZURhdGEuZ2xvYmFscy5zY3JlZW5JbmZvLndpZHRoICogZHByO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGdhbWVEYXRhLmdsb2JhbHMuc2NyZWVuSW5mby5oZWlnaHQgKiBkcHI7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSAoZ2FtZURhdGEuZ2xvYmFscy5zY3JlZW5JbmZvLndpZHRoKSArICdweCc7XHJcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gKGdhbWVEYXRhLmdsb2JhbHMuc2NyZWVuSW5mby5oZWlnaHQpICsgJ3B4JztcclxuICAgICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZ2FtZURhdGEuZ2xvYmFscy5pbWFnZVNtb290aGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtYWluIHNjZW5lIHJlbmRlcmluZyBmdW5jdGlvbi4gUmVuZGVycyBhbGwgb24tc2NyZWVuIFJlbmRlck5vZGVzIGluIHNjZW5lIHN1cHBsaWVkIGFzIHZpZXdlZCBieSB0aGUgY2FtZXJhIHN1cHBsaWVkXHJcbiAgICAgKi9cclxuICAgIHJlbmRlclNjZW5lKHNjZW5lOiBTY2VuZSwgY2FtZXJhOiBDYW1lcmEpIHtcclxuICAgICAgICBjb25zdCByZW5kZXJUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKGNhbWVyYS54ICogLTEsIGNhbWVyYS55ICogLTEpO1xyXG4gICAgICAgIGlmIChjYW1lcmEuem9vbSA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNjYWxlKGNhbWVyYS56b29tLCBjYW1lcmEuem9vbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY2VuZS5yZW5kZXJOb2Rlcy5mb3JFYWNoKChyZW5kZXJOb2RlOiBSZW5kZXJOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZW5kZXJOb2RlLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTm9kZShyZW5kZXJOb2RlLCByZW5kZXJUaW1lLCBjYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdvcmsgb3V0IHdoYXQga2luZCBvZiBub2RlIHRoaXMgaXMgYW5kIHJlbmRlciBpdCBhcyBhcHByb3ByaWF0ZVxyXG4gICAgICovXHJcbiAgICByZW5kZXJOb2RlKG5vZGU6IFJlbmRlck5vZGUsIHJlbmRlclRpbWU6IG51bWJlciwgY2FtZXJhOiBDYW1lcmEpIHtcclxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEltYWdlTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckltYWdlTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBbmltYXRpb25Ob2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQW5pbWF0aW9uTm9kZShub2RlLCByZW5kZXJUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5mb3JFYWNoQ2hpbGQoKGNoaWxkTm9kZTogUmVuZGVyTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vZGUoY2hpbGROb2RlLCByZW5kZXJUaW1lLCBjYW1lcmEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBhbiBJbWFnZU5vZGUgdG8gdGhlIGNhbnZhc1xyXG4gICAgICovXHJcbiAgICByZW5kZXJJbWFnZU5vZGUobm9kZTogSW1hZ2VOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBnYW1lRGF0YS5pbWFnZXMuYnlLZXlbbm9kZS5pbWFnZU5hbWVdO1xyXG4gICAgICAgIGlmIChpbWFnZSkge1xyXG4gICAgICAgICAgICBjb25zdCB3ID0gbm9kZS5hdXRvV2lkdGggPyBpbWFnZS53aWR0aCA6IG5vZGUudztcclxuICAgICAgICAgICAgY29uc3QgaCA9IG5vZGUuYXV0b0hlaWdodCA/IGltYWdlLmhlaWdodCA6IG5vZGUuaDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgbm9kZS54ICsgbm9kZS5vZmZzZXRYLCBub2RlLnkgKyBub2RlLm9mZnNldFksIHcsIGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYW4gQW5pbWF0aW9uTm9kZSB0byB0aGUgY2FudmFzXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckFuaW1hdGlvbk5vZGUobm9kZTogQW5pbWF0aW9uTm9kZSwgcmVuZGVyVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBnYW1lRGF0YS5pbWFnZXMuYnlLZXlbbm9kZS5pbWFnZU5hbWVdO1xyXG4gICAgICAgIGlmIChpbWFnZSAmJiByZW5kZXJUaW1lIC0gbm9kZS5sYXN0UmVuZGVyVGltZSA+IG5vZGUuZnJhbWVNaWxsaXMpIHtcclxuICAgICAgICAgICAgbm9kZS51cGRhdGVGcmFtZShyZW5kZXJUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgbm9kZS5jdXJyZW50RnJhbWUgKiBub2RlLncsIDAsIG5vZGUudywgbm9kZS5oLCBub2RlLnggKyBub2RlLm9mZnNldFgsIG5vZGUueSArIG5vZGUub2Zmc2V0WSwgbm9kZS53LCBub2RlLmgpO1xyXG4gICAgfVxyXG59Il19