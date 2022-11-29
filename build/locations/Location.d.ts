import { Scene } from '../import-manager.js';
import { AnimationNode, RenderNode } from '../import-manager.js';
import { Grid } from '../import-manager.js';
/** An implementation of the Scene class for managing game locations */
export declare class Location extends Scene {
    /** The key of the background image for this location */
    backgroundKey: string;
    /** The ID of the grid for this location */
    private gridId;
    /** The top-level RenderNodes used to manage what's in front of what */
    yIndexedLayers: RenderNode[];
    constructor(w: number, h: number, backgroundKey: string, grid: Grid);
    get grid(): Grid;
    set grid(grid: Grid);
    get gridSize(): number;
    /** Add an ImageNode snapped to the appropriate X and Y positions for it to */
    addGridImage(gridX: number, gridY: number, imageName: string): void;
    addGridAnimation(gridX: number, gridY: number, animation: AnimationNode): void;
    addRenderNodeAtY(node: RenderNode, yValue: number): void;
    removeYIndexedRenderNode(node: RenderNode): void;
}
