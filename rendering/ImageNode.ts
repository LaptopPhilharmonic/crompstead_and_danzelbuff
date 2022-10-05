import { RenderNode, RenderNodeData } from '../import-manager.js';

export type ImageNodeData = RenderNodeData & {
    imageName: string;
}

export class ImageNode extends RenderNode {
    imageName: string;
    /** If no width is specified, this will be set to true to indicate the width of the image itself should be used */
    autoWidth: boolean;
    /** If no height is specified, this will be set to true to indicate the height of the image itself should be used */
    autoHeight: boolean;

    constructor(data: ImageNodeData) {
        super(data);
        this.imageName = data.imageName;
        this.autoWidth = data.w === undefined;
        this.autoHeight = data.h === undefined;
    }
}