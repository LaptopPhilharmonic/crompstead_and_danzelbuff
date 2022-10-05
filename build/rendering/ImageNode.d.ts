import { RenderNode, RenderNodeData } from '../import-manager.js';
export declare type ImageNodeData = RenderNodeData & {
    imageName: string;
};
export declare class ImageNode extends RenderNode {
    imageName: string;
    /** If no width is specified, this will be set to true to indicate the width of the image itself should be used */
    autoWidth: boolean;
    /** If no height is specified, this will be set to true to indicate the height of the image itself should be used */
    autoHeight: boolean;
    constructor(data: ImageNodeData);
}
