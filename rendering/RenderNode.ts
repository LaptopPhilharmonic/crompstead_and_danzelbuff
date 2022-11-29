import { Scene, SceneID } from '../import-manager.js';
import { IndexableClass, Maybe, definitely } from '../util/typescript-helpers.js';

let nextId = 1;

/** All RenderNodes live here for lookup */
const allNodes: {[key: number]: RenderNode} = {};

export class RenderNodeID {
    number: number;

    constructor() {
        this.number = nextId;
        nextId += 1;
    }
}

export enum RelativeTo {
    scene = 'scene',
    parent = 'parent',
    camera = 'camera',
}

export enum Units {
    px = 'px',
    pc = '%',
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

export class RenderNode implements IndexableClass {
    id: RenderNodeID;
    [key: string]: any;

    private xx: number;
    xUnit: Units;
    xRelativeTo: RelativeTo;

    private yy: number;
    yUnit: Units;
    yRelativeTo: RelativeTo;

    private ww: number;
    wRelativeTo: RelativeTo;
    wUnit: Units;

    private hh: number;
    hRelativeTo: RelativeTo;
    hUnit: Units;

    private sceneId?: SceneID;
    private parentId?: RenderNodeID;
    children: RenderNodeID[];

    offsetX: number;
    offsetY: number;

    /** Will not render if this is set to false */
    visible: boolean = true;

    constructor(data: RenderNodeData) {
        this.id = new RenderNodeID();
        this.xx = data.x ?? 0;
        this.xRelativeTo = data.xRelativeTo ?? RelativeTo.scene;
        this.xUnit = data.xUnit ?? Units.px;
        this.yy = data.y ?? 0;
        this.yRelativeTo = data.yRelativeTo ?? RelativeTo.scene;
        this.yUnit = data.yUnit ?? Units.px;
        this.ww = data.w ?? 0;
        this.wRelativeTo = data.wRelativeTo ?? RelativeTo.scene;
        this.wUnit = data.wUnit ?? Units.px;
        this.hh = data.h ?? 0;
        this.hRelativeTo = data.hRelativeTo ?? RelativeTo.scene;
        this.hUnit = data.hUnit ?? Units.px;
        this.parentId = data.parent;
        this.children = data.children ?? [];
        this.sceneId = data.scene;
        this.offsetX = data.offsetX ?? 0;
        this.offsetY = data.offsetY ?? 0;

        allNodes[this.id.number] = this;
    }

    get parent(): Maybe<RenderNode> {
        return this.parentId ? allNodes[this.parentId.number] : undefined;
    }

    set parent(p: Maybe<RenderNode>) {
        this.detach();
        if (p instanceof RenderNode) {
            this.parentId = p.id;
            p.addChild(this);
        } else {
            this.parentId = undefined;
        }
    }

    /** Removes this RenderNode from its parent and Scene */
    detach() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this.sceneId) {
            this.scene?.removeRenderNode(this);
        }
    }

    /** All these properties have code in common to deal with unit types and relativity to parents */
    private getXYWH(setting: 'x' | 'y' | 'w' | 'h'): number {
        const nn = setting + setting; // Hidden variable names for these are always double the character
        const orientation = (setting === 'x' || setting === 'w') ? 'w' : 'h';
        const relativeTo = this[setting + 'RelativeTo'] as RelativeTo;
        const unit = this[setting + 'Unit'] as Units;

        switch (relativeTo) {
            case RelativeTo.scene:
                if (!this.scene) {
                    console.error(this);
                    throw new Error(`RenderNode with id ${this.id.number} is not in a Scene but is position relative to scene`);
                }
                if (unit === Units.px) {
                    return this[nn];
                } else if (unit === Units.pc) {
                    return this.scene[orientation] * this[nn];
                }
            case RelativeTo.camera:
                return this[nn]; // The renderer will handle where to put this
            case RelativeTo.parent:
                if (this.parent) {
                    if (unit === Units.px) {
                        return this.parent[setting] + this[nn];
                    } else if (unit === Units.pc) {
                        return this.parent[orientation] * this[nn];
                    }
                } else {
                    if (!this.scene) {
                        console.error(this);
                        throw new Error(`RenderNode with id ${this.id.number} is not in a Scene, and has no parent, but is positioned relative to parent`);
                    }
                    if (unit === Units.px) {
                        return this[nn];
                    } else if (unit === Units.pc) {
                        return this.scene[orientation] * this[nn];
                    }
                }
            default:
                return this[nn] as number;
        }       
    }

    private setXYWH(setting: 'x' | 'y' | 'w' | 'h', value: number, unit?: Units, relativeTo?: RelativeTo) {
        const nn = setting + setting; // Hidden variable names for these are always double the character
        this[nn] = value;
        if (unit) {
            this[setting + 'Unit'] = unit;
        }
        if (relativeTo) {
            this[setting + 'RelativeTo'] = relativeTo;
        }
    }

    get x(): number {
        return this.getXYWH('x');
    }

    setX(x: number, unit?: Units, relativeTo?: RelativeTo) {
        this.setXYWH('x', x, unit, relativeTo);
    }

    get y(): number {
        return this.getXYWH('y');
    }

    setY(y: number, unit?: Units, relativeTo?: RelativeTo) {
        this.setXYWH('y', y, unit, relativeTo);
    }

    get w(): number {
        return this.getXYWH('w');
    }

    set w(w: number) {
        this.ww = w;
    }

    setW(w: number, unit?: Units, relativeTo?: RelativeTo) {
        this.setXYWH('w', w, unit, relativeTo);        
    }

    get h(): number {
        return this.getXYWH('h');
    }

    set h(h: number) {
        this.hh = h;
    }

    setH(h: number, unit?: Units, relativeTo?: RelativeTo) {
        this.setXYWH('h', h, unit, relativeTo);        
    }

    /** Adds the node as a child of this node, removing any parent relationship it already has. Returns same node for chaining. */
    addChild(child: RenderNode): RenderNode {
        if (child instanceof RenderNode) {
            if (!this.children.find((c) => c.number === child.id.number)) {
                child.detach();
                this.children.push(child.id);
                child.parent = this;
            }
        } else {
            throw new TypeError('children must be supplied as RenderNode or RenderNodeID');            
        }
        return child;
    }

    removeChild(child: RenderNode) {
        const index = this.children.findIndex((c) => c.number === child.id.number);
        if (index > -1) {
            this.children.splice(index, 1);
        }
        child.parentId = undefined;
    }

    isParentOf(child: RenderNode): boolean {
        return !!this.children.find((c) => c.number === child.number);
    }

    /** Looks recursively to parent nodes to establish what Scene this RenderNode is in */
    get scene(): Maybe<Scene> {
        if (this.parentId) {
            return this.parent?.scene;
        }
        const possibleScene = Scene.byId(this.sceneId);
        return Scene.byId(this.sceneId);
    }

    /** Should only be set on top-level RenderNodes (attached directly to a Scene). Children inherit from the parent. Will throw errors otherwise */
    set scene(scene: Maybe<Scene>) {
        if (this.parentId) {
            throw new Error(`This RenderNode has a parent and should not have its Scene changed directly.`)
        }
        if (scene instanceof Scene) {
            this.sceneId = scene.id;
        } else {
            this.sceneId = undefined;
        }
    }

    get hasChildren(): boolean {
        return this.children.length > 0;
    }

    forEachChild(fn: (childNode: RenderNode) => void) {
        this.children.forEach((childID) => {
            const possibleChild = RenderNode.byId(childID);
            if (possibleChild) {
                fn(possibleChild);
            }
        });
    }

    /** Remove all references to this RenderNode and any of its children which would otherwise be floating around */
    delete() {
        this.forEachChild((child) => child.delete());
        this.detach();
        delete allNodes[this.id.number];
    }

    static byId(id: RenderNodeID): RenderNode | null {
        return allNodes[id.number];
    }
}