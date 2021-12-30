"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.ElectronicaGame = void 0;
const game_data_1 = require("./game-data/game-data");
const renderer_1 = require("./rendering/renderer");
const displayHelpers = __importStar(require("./util/display-helpers"));
class ElectronicaGame {
    constructor(options) {
        var _a, _b;
        this.data = new game_data_1.GameData({
            imageFolder: 'assets\\images\\',
            audioFolder: 'assets\\audio\\',
            screenInfo: displayHelpers.getScreenInfo(),
            allowedImageTypes: (_a = options.allowedImageTypes) !== null && _a !== void 0 ? _a : ['png', 'jpg'],
            allowedAudioTypes: (_b = options.allowedAudioTypes) !== null && _b !== void 0 ? _b : ['mp3', 'wav']
        });
        this.renderer = new renderer_1.Renderer(options.canvas, this.data);
        this.data.loadAllAssets().then(() => {
        });
    }
}
exports.ElectronicaGame = ElectronicaGame;
//# sourceMappingURL=game.js.map