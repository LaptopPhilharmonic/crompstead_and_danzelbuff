"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
class Renderer {
    constructor(canvas, gameData) {
        this.canvas = canvas;
        const possibleContext = this.canvas.getContext("2d");
        if (possibleContext === null) {
            throw new Error('Could not get 2D context for <canvas> element');
        }
        this.context = possibleContext;
        this.data = gameData;
        this.images = {};
    }
    /**
     * The main rendering function. Renders all on-screen RenderNodes in scene supplied as viewed by the camera supplied
     */
    render(scene, camera) {
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map