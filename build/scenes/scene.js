"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = exports.SceneID = void 0;
const render_node_1 = require("../rendering/render-node");
let nextId = 0;
/** All RenderNodes live here for lookup */
const allScenes = {};
class SceneID {
    constructor() {
        this.number = nextId;
        nextId += 1;
    }
}
exports.SceneID = SceneID;
class Scene {
    constructor(data) {
        this.id = new SceneID();
        this.w = data.w;
        this.h = data.h;
        this.renderNodeIDs = [];
    }
    get renderNodes() {
        return this.renderNodeIDs.map((id) => render_node_1.RenderNode.byId(id)).filter((node) => node !== null);
    }
    addRenderNode(node) {
        const id = node instanceof render_node_1.RenderNode ? node.id : node;
        if (!this.renderNodeIDs.includes(id)) {
            this.renderNodeIDs.push(id);
        }
    }
    addRenderNodes(nodes) {
        nodes.forEach((node) => this.addRenderNode(node));
    }
    static byId(id) {
        return id ? allScenes[id.number] : null;
    }
}
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map