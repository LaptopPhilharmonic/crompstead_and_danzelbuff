"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronicaGame = exports.gameData = void 0;
const import_manager_js_1 = require("./import-manager.js");
const import_manager_js_2 = require("./import-manager.js");
const import_manager_js_3 = require("./import-manager.js");
const import_manager_js_4 = require("./import-manager.js");
const displayHelpers = __importStar(require("./util/display-helpers.js"));
class ElectronicaGame {
    constructor(options) {
        var _a, _b, _c, _d;
        this.data = new import_manager_js_1.GameData({
            imageFolder: 'assets\\images\\',
            audioFolder: 'assets\\audio\\',
            screenInfo: displayHelpers.getScreenInfo(),
            allowedImageTypes: (_a = options.allowedImageTypes) !== null && _a !== void 0 ? _a : ['png', 'jpg'],
            allowedAudioTypes: (_b = options.allowedAudioTypes) !== null && _b !== void 0 ? _b : ['mp3', 'wav'],
            frameRate: (_c = options.frameRate) !== null && _c !== void 0 ? _c : 30,
            imageSmoothing: (_d = options.imageSmoothing) !== null && _d !== void 0 ? _d : false,
        });
        exports.gameData = this.data;
        const dpr = exports.gameData.globals.screenInfo.devicePixelRatio;
        options.canvas.width = this.data.globals.screenInfo.width * dpr;
        options.canvas.height = this.data.globals.screenInfo.height * dpr;
        options.canvas.style.width = (this.data.globals.screenInfo.width) + 'px';
        options.canvas.style.height = (this.data.globals.screenInfo.height) + 'px';
        // options.canvas.width = options.canvas.offsetWidth;
        // options.canvas.height = options.canvas.offsetHeight;
        this.renderer = new import_manager_js_2.Renderer(options.canvas);
        this.data.loadAllAssetsThen(() => {
            this.data.currentScene = import_manager_js_3.stationLobby.init();
            let quit = false;
            let lastRender = 0;
            const frameLength = Math.round(1000 / this.data.globals.frameRate);
            const camera = new import_manager_js_4.Camera({ x: 0, y: 0, zoom: 3 });
            camera.centreOnScene(this.data.currentScene);
            const loop = () => {
                if (new Date().valueOf() - lastRender > frameLength) {
                    if (this.data.currentScene) {
                        this.renderer.renderScene(this.data.currentScene, camera);
                        lastRender = new Date().valueOf();
                    }
                }
                if (!quit) {
                    setTimeout(loop, 10);
                }
            };
            setTimeout(loop, 10);
        });
    }
}
exports.ElectronicaGame = ElectronicaGame;
//# sourceMappingURL=ElectronicaGame.js.map