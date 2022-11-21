import { Scene } from '../import-manager.js';
import { Camera } from '../import-manager.js';
import { RenderNode, ImageNode, AnimationNode } from '../import-manager.js';
import { gameData } from '../ElectronicaGame.js';
import * as displayHelpers from '../util/display-helpers';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private devicePixelRatio: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const possibleContext = this.canvas.getContext('2d');
        if (possibleContext === null) {
            throw new Error('Could not get 2D context for <canvas> element');
        }
        this.context = possibleContext;
        this.context.imageSmoothingEnabled = gameData.globals.imageSmoothing;
        this.devicePixelRatio = gameData.globals.screenInfo.devicePixelRatio;

        window.addEventListener('resize', () => {
            this.handleCanvasResize();
        });
    }

    /** Take care of resizing of the canvas */
    handleCanvasResize() {
        gameData.globals.screenInfo = displayHelpers.getScreenInfo();
        const dpr = gameData.globals.screenInfo.devicePixelRatio;
        this.canvas.width = gameData.globals.screenInfo.width * dpr;
        this.canvas.height = gameData.globals.screenInfo.height * dpr;
        this.canvas.style.width = (gameData.globals.screenInfo.width) + 'px';
        this.canvas.style.height = (gameData.globals.screenInfo.height) + 'px';
        this.context.imageSmoothingEnabled = gameData.globals.imageSmoothing;
    }

    /**
     * The main scene rendering function. Renders all on-screen RenderNodes in scene supplied as viewed by the camera supplied
     */
    renderScene(scene: Scene, camera: Camera) {
        const renderTime = new Date().valueOf();
        this.context.save();
        this.context.translate(camera.x * -1, camera.y * -1);
        if (camera.zoom > 1) {
            this.context.scale(camera.zoom, camera.zoom);
        }

        scene.renderNodes.forEach((renderNode: RenderNode) => {
            this.renderNode(renderNode, renderTime, camera);
        });

        this.context.restore();
    }

    /**
     * Work out what kind of node this is and render it as appropriate
     */
    renderNode(node: RenderNode, renderTime: number, camera: Camera) {
        if (node instanceof ImageNode) {
            this.renderImageNode(node);
        }
        if (node instanceof AnimationNode) {
            this.renderAnimationNode(node, renderTime);
        }
        node.forEachChild((childNode: RenderNode) => {
            this.renderNode(childNode, renderTime, camera);
        });
    }

    /**
     * Draw an ImageNode to the canvas
     */
    renderImageNode(node: ImageNode) {
        const image = gameData.images.byKey[node.imageName];
        if (image) {
            const w = node.autoWidth ? image.width : node.w;
            const h = node.autoHeight ? image.height : node.h;
            this.context.drawImage(image, node.x + node.offsetX, node.y + node.offsetY, w, h);
        }
    }

    /**
     * Draw an AnimationNode to the canvas
     */
    renderAnimationNode(node: AnimationNode, renderTime: number) {
        const image = gameData.images.byKey[node.imageName];
        if (image && renderTime - node.lastRenderTime > node.frameMillis) {
            node.updateFrame(renderTime);
        }
        this.context.drawImage(image, node.currentFrame * node.w, 0, node.w, node.h, node.x + node.offsetX, node.y + node.offsetY, node.w, node.h);
    }
}