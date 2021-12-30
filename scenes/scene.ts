import { Camera, CameraID } from '../rendering/camera';
import { RenderNode, RenderNodeID } from '../rendering/render-node';

let nextId = 0;

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
    }

    get renderNodes(): RenderNode[] {
        return this.renderNodeIDs.map((id) => RenderNode.byId(id)).filter((node) => node !== null) as RenderNode[];
    }

    addRenderNode(node: RenderNode | RenderNodeID) {
        const id = node instanceof RenderNode ? node.id : node;
        if (!this.renderNodeIDs.includes(id)) {
            this.renderNodeIDs.push(id);
        }
    }

    addRenderNodes(nodes: RenderNode[] | RenderNodeID[]) {
        nodes.forEach((node) => this.addRenderNode(node));
    }

    static byId(id?: SceneID): Scene | null {
        return id ? allScenes[id.number] : null;
    }
}