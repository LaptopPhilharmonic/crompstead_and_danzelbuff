"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thing = exports.ThingID = void 0;
let nextId = 0;
class ThingID {
    constructor() {
        this.number = nextId;
        nextId += 1;
    }
}
exports.ThingID = ThingID;
class Thing {
    constructor(data) {
        var _a, _b, _c, _d;
        this.id = new ThingID();
        this.x = (_a = data.x) !== null && _a !== void 0 ? _a : 0;
        this.xx = this.x;
        this.y = (_b = data.y) !== null && _b !== void 0 ? _b : 0;
        this.yy = data.y;
        this.parent = data.parent;
        this.children = (_c = data.children) !== null && _c !== void 0 ? _c : [];
        this.renderNodes = (_d = data.renderNodes) !== null && _d !== void 0 ? _d : [];
    }
}
exports.Thing = Thing;
//# sourceMappingURL=Thing.js.map