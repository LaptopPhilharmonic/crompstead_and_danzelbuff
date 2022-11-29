import { RenderNode, RenderNodeID } from '../import-manager.js';
import { Maybe } from '../util/typescript-helpers.js';

let nextId = 1;

/** All RenderNodes live here for lookup */
const allScenes: {[key: number]: Scene} = {};

export class SceneID {
    number: number;

    constructor() {
        this.number = nextId;
        nextId += 1;
    }
}

export type SceneData = {
    w: number;
    h: number;
}

export class Scene {
    id: SceneID;
    w: number;
    h: number;
    private renderNodeIDs: RenderNodeID[];

    constructor(data: SceneData) {
        this.id = new SceneID();
        this.w = data.w;
        this.h = data.h;
        this.renderNodeIDs = [];
        
        allScenes[this.id.number] = this;
    }

    get renderNodes(): RenderNode[] {
        return this.renderNodeIDs.map((id) => RenderNode.byId(id)).filter((node) => node !== null) as RenderNode[];
    }

    /** Adds a render node, and returns that node for reference. Unless it doesn't exist - it'll throw an error then. */
    addRenderNode(node: RenderNode): RenderNode {
        if (!this.isParentOf(node)) {
            node.detach();
            this.renderNodeIDs.push(node.id);
            node.scene = this;
        }
        return node;
    }

    addRenderNodes(nodes: RenderNode[]) {
        nodes.forEach((node) => this.addRenderNode(node));
    }

    isParentOf(node: RenderNode) {
        return !!this.renderNodeIDs.find((id) => id.number === node.id.number);
    }

    /** Removes the ID of the RenderNode from this Scene, but does not delete the RenderNode itself */
    removeRenderNode(node: RenderNode) {
        const index = this.renderNodeIDs.findIndex((n) => n.number === node.id.number);
        if (index > -1) {
            this.renderNodeIDs.splice(index, 1);
        }
        node.scene = null;
    }

    /** Removes the IDs of the RenderNodes from this Scene, but does not delete the RenderNodes themselves */
    removeRenderNodes(nodes: RenderNode[]) {
        nodes.forEach((n) => this.removeRenderNode(n));
    }

    static byId(id: Maybe<SceneID>): Maybe<Scene> {
        return id ? allScenes[id.number] : null;
    }
}