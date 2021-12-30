import { RenderNode, RenderNodeID, RenderNodeData } from './render-node';

export type ImageNodeData = RenderNodeData & {
    imageName: string;
}

export class ImageNode extends RenderNode {
    imageName: string;

    constructor(data: ImageNodeData) {
        super(data);
        this.imageName = data.imageName;
    }
}