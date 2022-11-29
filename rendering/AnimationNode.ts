import { RenderNode, RenderNodeData } from '../import-manager.js';
import { gameData } from '../ElectronicaGame.js';

export type AnimationNodeData = RenderNodeData & {
    imageName: string;
    /** Provide the width of a single frame, not the whole image. Not optional because we used it to calculate things. */
    w: number;
    /** Required */
    h: number;
    frameMillis: number;
    /** Defaults to true */
    loops?: boolean;
}

export class AnimationNode extends RenderNode {
    imageName: string;
    frameMillis: number;
    frames: number;
    totalMillis: number;
    lastRenderTime: number;
    currentFrame: number;
    loops: boolean;

    constructor(data: AnimationNodeData) {
        super(data);
        this.imageName = data.imageName;
        this.frameMillis = data.frameMillis;
        this.lastRenderTime = 0;
        this.currentFrame = -1;
        this.loops = data.loops ?? true;

        const img = gameData.images.byKey[this.imageName];
        this.frames = Math.floor(img.width / data.w);
        this.totalMillis = this.frameMillis * this.frames;
    }

    /** Updates the currentFrame and lastRenderTime, and returns the new frame number */
    updateFrame(renderTime: number): number {
        this.lastRenderTime = renderTime;
        this.currentFrame += 1;
        if (this.currentFrame >= this.frames) {
            if (this.loops) {
                this.currentFrame = 0;
            } else {
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