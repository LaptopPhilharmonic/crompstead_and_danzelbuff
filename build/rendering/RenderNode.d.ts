import { Scene, SceneID } from '../import-manager.js';
import { IndexableClass, Maybe } from '../util/typescript-helpers.js';
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
export interface RenderNodeData {
    /** Default: 0 */
    x?: Maybe<number>;
    /** Default: scene */
    xRelativeTo?: RelativeTo;
    /** Default: px */
    xUnit?: Units;
    /** Default: 0 */
    y?: Maybe<number>;
    /** Default: scene */
    yRelativeTo?: RelativeTo;
    /** Default: px */
    yUnit?: Units;
    /** Default: 0 */
    w?: Maybe<number>;
    /** Default: scene */
    wRelativeTo?: RelativeTo;
    /** Default: px */
    wUnit?: Units;
    /** Default: 0 */
    h?: Maybe<number>;
    /** Default: scene */
    hRelativeTo?: RelativeTo;
    /** Default: px */
    hUnit?: Units;
    parent?: RenderNodeID;
    children?: RenderNodeID[];
    scene?: SceneID;
    /** How many pixels to add (or subtract) when positioning this RenderNode */
    offsetX?: number;
    /** How many pixels to add (or subtract) when positioning this RenderNode */
    offsetY?: number;
}
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
    offsetX: number;
    offsetY: number;
    /** Will not render if this is set to false */
    visible: boolean;
    constructor(data: RenderNodeData);
    get parent(): Maybe<RenderNode>;
    set parent(p: Maybe<RenderNode>);
    /** Removes this RenderNode from its parent and Scene */
    detach(): void;
    /** All these properties have code in common to deal with unit types and relativity to parents */
    private getXYWH;
    private setXYWH;
    get x(): number;
    setX(x: number, unit?: Units, relativeTo?: RelativeTo): void;
    get y(): number;
    setY(y: number, unit?: Units, relativeTo?: RelativeTo): void;
    get w(): number;
    set w(w: number);
    setW(w: number, unit?: Units, relativeTo?: RelativeTo): void;
    get h(): number;
    set h(h: number);
    setH(h: number, unit?: Units, relativeTo?: RelativeTo): void;
    /** Adds the node as a child of this node, removing any parent relationship it already has. Returns same node for chaining. */
    addChild(child: RenderNode): RenderNode;
    removeChild(child: RenderNode): void;
    isParentOf(child: RenderNode): boolean;
    /** Looks recursively to parent nodes to establish what Scene this RenderNode is in */
    get scene(): Maybe<Scene>;
    /** Should only be set on top-level RenderNodes (attached directly to a Scene). Children inherit from the parent. Will throw errors otherwise */
    set scene(scene: Maybe<Scene>);
    get hasChildren(): boolean;
    forEachChild(fn: (childNode: RenderNode) => void): void;
    /** Remove all references to this RenderNode and any of its children which would otherwise be floating around */
    delete(): void;
    static byId(id: RenderNodeID): RenderNode | null;
}
