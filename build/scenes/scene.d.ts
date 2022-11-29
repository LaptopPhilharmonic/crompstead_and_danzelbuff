import { RenderNode } from '../import-manager.js';
import { Maybe } from '../util/typescript-helpers.js';
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
    /** Adds a render node, and returns that node for reference. Unless it doesn't exist - it'll throw an error then. */
    addRenderNode(node: RenderNode): RenderNode;
    addRenderNodes(nodes: RenderNode[]): void;
    isParentOf(node: RenderNode): boolean;
    /** Removes the ID of the RenderNode from this Scene, but does not delete the RenderNode itself */
    removeRenderNode(node: RenderNode): void;
    /** Removes the IDs of the RenderNodes from this Scene, but does not delete the RenderNodes themselves */
    removeRenderNodes(nodes: RenderNode[]): void;
    static byId(id: Maybe<SceneID>): Maybe<Scene>;
}
