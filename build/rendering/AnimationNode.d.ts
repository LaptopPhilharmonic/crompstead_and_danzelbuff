import { RenderNode, RenderNodeData } from '../import-manager.js';
export declare type AnimationNodeData = RenderNodeData & {
    imageName: string;
    /** Provide the width of a single frame, not the whole image. Not optional because we used it to calculate things. */
    w: number;
    /** Required */
    h: number;
    frameMillis: number;
    /** Defaults to true */
    loops?: boolean;
};
export declare class AnimationNode extends RenderNode {
    imageName: string;
    frameMillis: number;
    frames: number;
    totalMillis: number;
    lastRenderTime: number;
    currentFrame: number;
    loops: boolean;
    constructor(data: AnimationNodeData);
    /** Updates the currentFrame and lastRenderTime, and returns the new frame number */
    updateFrame(renderTime: number): number;
}
