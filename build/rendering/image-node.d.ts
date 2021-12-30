import { RenderNode, RenderNodeData } from './render-node';
export declare type ImageNodeData = RenderNodeData & {
    imageName: string;
};
export declare class ImageNode extends RenderNode {
    imageName: string;
    constructor(data: ImageNodeData);
}
