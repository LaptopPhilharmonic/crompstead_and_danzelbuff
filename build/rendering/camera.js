"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = exports.CameraID = void 0;
const ElectronicaGame_js_1 = require("../ElectronicaGame.js");
let nextID = 1;
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
        this.x = data.x;
        this.y = data.y;
        this.zoom = (_a = data.zoom) !== null && _a !== void 0 ? _a : 1;
        this.on = (_b = data.on) !== null && _b !== void 0 ? _b : true;
        allCameras[this.id.number] = this;
    }
    static byId(id) {
        return allCameras[id.number];
    }
    centreOnScene(scene) {
        const screen = ElectronicaGame_js_1.gameData.globals.screenInfo;
        this.x = ((scene.w * this.zoom) / 2) - ((screen.width * screen.devicePixelRatio) / 2);
        this.y = ((scene.h * this.zoom) / 2) - ((screen.height * screen.devicePixelRatio) / 2);
    }
}
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map