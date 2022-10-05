import { RenderNodeID } from "../import-manager.js";

let nextId = 0;

export type ThingData = {
    x: number;
    y: number;
    parent?: ThingID;
    children: ThingID[];
    renderNodes: RenderNodeID[];
}

export class ThingID {
    number: number;

    constructor() {
        this.number = nextId;
        nextId += 1;
    }
}

export class Thing {
    id: ThingID;
    x: number;
    private xx: number;
    y: number;
    private yy: number;
    parent?: ThingID;
    children: ThingID[];
    renderNodes: RenderNodeID[];

    constructor(data: ThingData) {
        this.id = new ThingID();
        this.x = data.x ?? 0;
        this.xx = this.x;
        this.y = data.y ?? 0;
        this.yy = data.y;
        this.parent = data.parent;
        this.children = data.children ?? [];
        this.renderNodes = data.renderNodes ?? [];
    }
}