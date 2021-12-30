import { Scene, SceneID } from '../scenes/scene';
import { IndexableClass } from '../util/typescript-helpers';
export declare class RenderNodeID {
    number: number;
    constructor();
}
export declare enum RelativeTo {
    scene = "scene",
    parent = "parent",
    camera = "camera"
}
export declare enum Units {
    px = "px",
    pc = "%"
}
export declare type RenderNodeData = {
    x: number;
    /** Default: scene */
    xRelativeTo?: RelativeTo;
    /** Default: px */
    xUnit?: Units;
    y: number;
    /** Default: scene */
    yRelativeTo?: RelativeTo;
    /** Default: px */
    yUnit?: Units;
    w: number;
    /** Default: scene */
    wRelativeTo?: RelativeTo;
    /** Default: px */
    wUnit?: Units;
    h: number;
    /** Default: scene */
    hRelativeTo?: RelativeTo;
    /** Default: px */
    hUnit?: Units;
    parent?: RenderNodeID;
    children?: RenderNodeID[];
    scene?: SceneID;
};
export declare class RenderNode implements IndexableClass {
    id: RenderNodeID;
    [key: string]: any;
    private xx;
    xUnit: Units;
    xRelativeTo: RelativeTo;
    private yy;
    yUnit: Units;
    yRelativeTo: RelativeTo;
    private ww;
    wRelativeTo: RelativeTo;
    wUnit: Units;
    private hh;
    hRelativeTo: RelativeTo;
    hUnit: Units;
    private sceneId?;
    private parentId?;
    children: RenderNodeID[];
    constructor(data: RenderNodeData);
    get parent(): RenderNode | null;
    set parent(p: RenderNode | RenderNodeID | null);
    /** All these properties have code in common to deal with unit types and relativity to parents */
    private getXYWH;
    private setXYWH;
    get x(): number;
    set x(x: number);
    setX(x: number, unit?: Units, relativeTo?: RelativeTo): void;
    get y(): number;
    set y(y: number);
    setY(y: number, unit?: Units, relativeTo?: RelativeTo): void;
    get w(): number;
    set w(w: number);
    setW(w: number, unit?: Units, relativeTo?: RelativeTo): void;
    get h(): number;
    set h(h: number);
    setH(h: number, unit?: Units, relativeTo?: RelativeTo): void;
    addChild(child: RenderNode | RenderNodeID): void;
    removeChild(child: RenderNode | RenderNodeID): void;
    get scene(): Scene | null;
    set scene(scene: Scene | SceneID | null);
    static byId(id: RenderNodeID): RenderNode | null;
}
