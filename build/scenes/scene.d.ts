import { RenderNode, RenderNodeID } from '../rendering/render-node';
export declare class SceneID {
    number: number;
    constructor();
}
export declare type SceneData = {
    w: number;
    h: number;
};
export declare class Scene {
    id: SceneID;
    w: number;
    h: number;
    private renderNodeIDs;
    constructor(data: SceneData);
    get renderNodes(): RenderNode[];
    addRenderNode(node: RenderNode | RenderNodeID): void;
    addRenderNodes(nodes: RenderNode[] | RenderNodeID[]): void;
    static byId(id?: SceneID): Scene | null;
}
