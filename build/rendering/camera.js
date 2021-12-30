"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = exports.CameraID = void 0;
let nextID = 0;
class CameraID {
    constructor() {
        this.number = nextID;
        nextID += 1;
    }
}
exports.CameraID = CameraID;
const allCameras = {};
class Camera {
    constructor(data) {
        var _a, _b;
        this.zoom = 1;
        this.on = true;
        this.id = new CameraID();
        this.w = data.w;
        this.h = data.h;
        this.zoom = (_a = data.zoom) !== null && _a !== void 0 ? _a : 1;
        this.on = (_b = data.on) !== null && _b !== void 0 ? _b : true;
        allCameras[this.id.number] = this;
    }
    static byId(id) {
        return allCameras[id.number];
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map