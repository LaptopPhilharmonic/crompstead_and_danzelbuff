import { RenderNodeID } from "../rendering/render-node";
export declare type ThingData = {
    x: number;
    y: number;
    parent?: ThingID;
    children: ThingID[];
    renderNodes: RenderNodeID[];
};
export declare class ThingID implements ThingID {
    number: number;
    constructor();
}
export declare class Thing {
    id: ThingID;
    x: number;
    private xx;
    y: number;
    private yy;
    parent?: ThingID;
    children: ThingID[];
    renderNodes: RenderNodeID[];
    constructor(data: ThingData);
}
