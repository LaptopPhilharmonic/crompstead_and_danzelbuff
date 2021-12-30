"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderNode = exports.Units = exports.RelativeTo = exports.RenderNodeID = void 0;
const scene_1 = require("../scenes/scene");
let nextId = 0;
/** All RenderNodes live here for lookup */
const allNodes = {};
class RenderNodeID {
    constructor() {
        this.number = nextId;
        nextId += 1;
    }
}
exports.RenderNodeID = RenderNodeID;
var RelativeTo;
(function (RelativeTo) {
    RelativeTo["scene"] = "scene";
    RelativeTo["parent"] = "parent";
    RelativeTo["camera"] = "camera";
})(RelativeTo = exports.RelativeTo || (exports.RelativeTo = {}));
var Units;
(function (Units) {
    Units["px"] = "px";
    Units["pc"] = "%";
})(Units = exports.Units || (exports.Units = {}));
class RenderNode {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        this.id = new RenderNodeID();
        this.xx = (_a = data.x) !== null && _a !== void 0 ? _a : 0;
        this.xRelativeTo = (_b = data.xRelativeTo) !== null && _b !== void 0 ? _b : RelativeTo.scene;
        this.xUnit = (_c = data.xUnit) !== null && _c !== void 0 ? _c : Units.px;
        this.yy = (_d = data.y) !== null && _d !== void 0 ? _d : 0;
        this.yRelativeTo = (_e = data.yRelativeTo) !== null && _e !== void 0 ? _e : RelativeTo.scene;
        this.yUnit = (_f = data.yUnit) !== null && _f !== void 0 ? _f : Units.px;
        this.ww = (_g = data.w) !== null && _g !== void 0 ? _g : 0;
        this.wRelativeTo = (_h = data.wRelativeTo) !== null && _h !== void 0 ? _h : RelativeTo.scene;
        this.wUnit = (_j = data.wUnit) !== null && _j !== void 0 ? _j : Units.px;
        this.hh = (_k = data.h) !== null && _k !== void 0 ? _k : 0;
        this.hRelativeTo = (_l = data.hRelativeTo) !== null && _l !== void 0 ? _l : RelativeTo.scene;
        this.hUnit = (_m = data.hUnit) !== null && _m !== void 0 ? _m : Units.px;
        this.parentId = data.parent;
        this.children = (_o = data.children) !== null && _o !== void 0 ? _o : [];
        this.sceneId = data.scene;
        allNodes[this.id.number] = this;
    }
    get parent() {
        return this.parentId ? allNodes[this.parentId.number] : null;
    }
    set parent(p) {
        if (p instanceof RenderNode) {
            this.parentId = p.id;
            if (p.children.includes(this.id)) {
                p.children.push(this.id);
            }
        }
        else if (p instanceof RenderNodeID) {
            const parentNode = allNodes[p.number];
            if (parentNode) {
                this.parent = p;
                parentNode.addChild(this);
            }
            else {
                throw new Error(`No RenderNode found with id ${p.number}`);
            }
        }
        else {
            throw new TypeError('parent can only be set to a RenderNode or a RenderNodeID');
        }
    }
    /** All these properties have code in common to deal with unit types and relativity to parents */
    getXYWH(setting) {
        const nn = setting + setting; // Hidden variable names for these are always double the character
        const orientation = (setting === 'x' || setting === 'w') ? 'w' : 'h';
        const relativeTo = this[setting + 'RelativeTo'];
        const unit = this[setting + 'Unit'];
        if (!this.scene) {
            throw new Error(`RenderNode with id ${this.id.number} is not in a Scene`);
        }
        switch (relativeTo) {
            case RelativeTo.scene:
                if (unit === Units.px) {
                    return this[nn];
                }
                else if (unit === Units.pc) {
                    return this.scene[orientation] * this[nn];
                }
            case RelativeTo.camera:
                return this[nn]; // The renderer will handle where to put this
            case RelativeTo.parent:
                if (this.parent) {
                    if (unit === Units.px) {
                        return this.parent[setting] + this[nn];
                    }
                    else if (unit === Units.pc) {
                        return this.parent[orientation] * this[nn];
                    }
                }
                else {
                    if (unit === Units.px) {
                        return this[nn];
                    }
                    else if (unit === Units.pc) {
                        return this.scene[orientation] * this[nn];
                    }
                }
            default:
                return this[nn];
        }
    }
    setXYWH(setting, value, unit, relativeTo) {
        const nn = setting + setting; // Hidden variable names for these are always double the character
        this[nn] = value;
        if (unit) {
            this[setting + 'Unit'] = unit;
        }
        if (relativeTo) {
            this[setting + 'RelativeTo'] = relativeTo;
        }
    }
    get x() {
        return this.getXYWH('x');
    }
    set x(x) {
        this.xx = x;
    }
    setX(x, unit, relativeTo) {
        this.setXYWH('x', x, unit, relativeTo);
    }
    get y() {
        return this.getXYWH('y');
    }
    set y(y) {
        this.yy = y;
    }
    setY(y, unit, relativeTo) {
        this.setXYWH('y', y, unit, relativeTo);
    }
    get w() {
        return this.getXYWH('w');
    }
    set w(w) {
        this.ww = w;
    }
    setW(w, unit, relativeTo) {
        this.setXYWH('w', w, unit, relativeTo);
    }
    get h() {
        return this.getXYWH('h');
    }
    set h(h) {
        this.hh = h;
    }
    setH(h, unit, relativeTo) {
        this.setXYWH('h', h, unit, relativeTo);
    }
    addChild(child) {
        if (child instanceof RenderNode) {
            if (!this.children.includes(child.id)) {
                this.children.push(child.id);
                child.parent = this;
            }
        }
        else if (child instanceof RenderNodeID) {
            const childNode = allNodes[child.number];
            if (childNode && !this.children.includes(child)) {
                this.children.push(child);
                childNode.parent = this;
            }
            else if (!childNode) {
                throw new Error(`No RenderNode found with id ${child.number}`);
            }
        }
        else {
            throw new TypeError('children must be supplied as RenderNode or RenderNodeID');
        }
    }
    removeChild(child) {
        if (!(child instanceof RenderNode || child instanceof RenderNodeID)) {
            throw new TypeError('children must be supplied as RenderNode or RenderNodeID');
        }
        const childId = child instanceof RenderNodeID ? child : child.id;
        const index = this.children.indexOf(childId);
        if (index > -1) {
            this.children = this.children.splice(index, 1);
        }
    }
    get scene() {
        const possibleScene = scene_1.Scene.byId(this.sceneId);
        return scene_1.Scene.byId(this.sceneId);
    }
    set scene(scene) {
        if (scene instanceof scene_1.Scene) {
            this.sceneId = scene.id;
        }
        else if (scene instanceof scene_1.SceneID) {
            this.sceneId = scene;
        }
        else {
            throw new TypeError('scene must be set to Scene or SceneID instance');
        }
    }
    static byId(id) {
        return allNodes[id.number];
    }
}
exports.RenderNode = RenderNode;
//# sourceMappingURL=render-node.js.map