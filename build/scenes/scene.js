"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = exports.SceneID = void 0;
const import_manager_js_1 = require("../import-manager.js");
let nextId = 1;
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
        allScenes[this.id.number] = this;
    }
    get renderNodes() {
        return this.renderNodeIDs.map((id) => import_manager_js_1.RenderNode.byId(id)).filter((node) => node !== null);
    }
    /** Adds a render node, and returns that node for reference. Unless it doesn't exist - it'll throw an error then. */
    addRenderNode(node) {
        const id = node instanceof import_manager_js_1.RenderNode ? node.id : node;
        if (!this.renderNodeIDs.includes(id)) {
            this.renderNodeIDs.push(id);
        }
        const actualNode = node instanceof import_manager_js_1.RenderNode ? node : import_manager_js_1.RenderNode.byId(id);
        if (!actualNode) {
            throw new Error(`No RenderNode exists with ID ${id}`);
        }
        actualNode.scene = this.id;
        return actualNode;
    }
    addRenderNodes(nodes) {
        nodes.forEach((node) => this.addRenderNode(node));
    }
    /** Removes the ID of the RenderNode from this Scene, but does not delete the RenderNode itself */
    removeRenderNode(node) {
        const id = node instanceof import_manager_js_1.RenderNode ? node.id : node;
        if (this.renderNodeIDs.includes(id)) {
            this.renderNodeIDs = this.renderNodeIDs.filter((n) => n !== id);
        }
        const actualNode = node instanceof import_manager_js_1.RenderNode ? node : import_manager_js_1.RenderNode.byId(node);
        if (actualNode) {
            actualNode.scene = null;
        }
    }
    /** Removes the IDs of the RenderNodes from this Scene, but does not delete the RenderNodes themselves */
    removeRenderNodes(nodes) {
        nodes.forEach((n) => this.removeRenderNode(n));
    }
    static byId(id) {
        return id ? allScenes[id.number] : null;
    }
}
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map