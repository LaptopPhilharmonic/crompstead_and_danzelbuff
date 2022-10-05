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
exports.GameData = void 0;
const fileHelpers = __importStar(require("../util/file-helpers.js"));
let imagesToLoad = 0;
let audioToLoad = 0;
let imagesLoaded = 0;
let audioLoaded = 0;
let loadChecker;
class GameData {
    constructor(globals) {
        this.globals = globals;
        this.images = {
            byKey: {},
        };
        this.audio = {
            byKey: {},
        };
        this.events = {};
    }
    addImage(key, image) {
        console.log(`key: ${key}, image: ${image}`);
        this.images.byKey[key] = image;
    }
    addAudio(key, audio) {
        this.audio.byKey[key] = audio;
    }
    loadImagesFromImageFolder() {
        const files = fileHelpers.getFilesRecursively(this.globals.imageFolder);
        files.forEach((filename) => {
            var _a;
            if (this.globals.allowedImageTypes.includes((_a = filename.split('.').pop()) !== null && _a !== void 0 ? _a : '')) {
                imagesToLoad += 1;
                const key = filename.replace(this.globals.imageFolder, '').replace(/\\/g, '/');
                this.addImage(key, document.createElement('img'));
                this.images.byKey[key].src = filename;
                this.images.byKey[key].onload = () => { imagesLoaded += 1; };
            }
        });
    }
    loadAudioFromAudioFolder() {
        const files = fileHelpers.getFilesRecursively(this.globals.audioFolder);
        files.forEach((filename) => {
            var _a;
            if (this.globals.allowedAudioTypes.includes((_a = filename.split('.').pop()) !== null && _a !== void 0 ? _a : '')) {
                audioToLoad += 1;
                const key = filename.replace(this.globals.audioFolder, '');
                this.addAudio(key, document.createElement('audio'));
                this.audio.byKey[key].src = filename;
                this.audio.byKey[key].oncanplaythrough = () => { audioLoaded += 1; };
            }
        });
    }
    loadAllAssetsThen(afterLoadFunction) {
        this.afterLoadFunction = afterLoadFunction;
        this.loadImagesFromImageFolder();
        this.loadAudioFromAudioFolder();
        console.log('Loading assets...');
        if (imagesToLoad + audioToLoad === 0) {
            console.log('...no assets found.');
        }
        else {
            setTimeout(() => { this.checkAllAssetsLoaded(); }, 100);
        }
    }
    checkAllAssetsLoaded() {
        const totalToLoad = audioToLoad + imagesToLoad;
        const totalLoaded = audioLoaded + imagesLoaded;
        if (totalLoaded === totalToLoad) {
            console.log('...all assets loaded');
            if (typeof this.afterLoadFunction === 'function') {
                console.log('!!!!afterload');
                this.afterLoadFunction();
            }
        }
        else {
            console.log(`...${(Math.round(totalLoaded / totalToLoad * 100))}%`);
            setTimeout(() => { this.checkAllAssetsLoaded; }, 100);
        }
    }
}
exports.GameData = GameData;
//# sourceMappingURL=GameData.js.map