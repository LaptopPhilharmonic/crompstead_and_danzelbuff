"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const import_manager_js_1 = require("../import-manager.js");
const ElectronicaGame_js_1 = require("../ElectronicaGame.js");
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
            this.context.drawImage(image, node.x, node.y, w, h);
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
        this.context.drawImage(image, node.currentFrame * node.w, 0, node.w, node.h, node.x, node.y, node.w, node.h);
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map