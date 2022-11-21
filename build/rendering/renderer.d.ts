import { Scene } from '../import-manager.js';
import { Camera } from '../import-manager.js';
import { RenderNode, ImageNode, AnimationNode } from '../import-manager.js';
export declare class Renderer {
    private canvas;
    private context;
    private devicePixelRatio;
    constructor(canvas: HTMLCanvasElement);
    /** Take care of resizing of the canvas */
    handleCanvasResize(): void;
    /**
     * The main scene rendering function. Renders all on-screen RenderNodes in scene supplied as viewed by the camera supplied
     */
    renderScene(scene: Scene, camera: Camera): void;
    /**
     * Work out what kind of node this is and render it as appropriate
     */
    renderNode(node: RenderNode, renderTime: number, camera: Camera): void;
    /**
     * Draw an ImageNode to the canvas
     */
    renderImageNode(node: ImageNode): void;
    /**
     * Draw an AnimationNode to the canvas
     */
    renderAnimationNode(node: AnimationNode, renderTime: number): void;
}
