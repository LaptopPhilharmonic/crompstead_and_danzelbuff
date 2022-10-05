import { Scene } from '../import-manager.js';
import type { ScreenInfo } from '../util/display-helpers.js';
import * as fileHelpers from '../util/file-helpers.js';

let imagesToLoad = 0;
let audioToLoad = 0;
let imagesLoaded = 0;
let audioLoaded = 0;
let loadChecker: NodeJS.Timeout | undefined;

/**
 * All the images that have been loaded into the game
 */
type ImageData = {
    /** All images, indexed by their URL, relative to /images */
    byKey: {[index: string]: HTMLImageElement}
};

/**
 * All the audio files that have been loaded into the game
 */
type AudioData = {
    /** All audio files, indexed by their URL, relative to /images */    
    byKey: {[index: string]: HTMLAudioElement}
};

/**
 * Info that is true and valid whatever part of the game code we're in
 */
type GlobalData = {
    imageFolder: string;
    audioFolder: string;
    screenInfo: ScreenInfo;
    allowedImageTypes: string[];
    allowedAudioTypes: string[];
    frameRate: number;
    imageSmoothing: boolean;
};

type EventsData = {};

export class GameData {
    events: EventsData;
    globals: GlobalData;
    images: ImageData;
    audio: AudioData;
    currentScene?: Scene;
    afterLoadFunction?: () => unknown;


    constructor(globals: GlobalData) {
        this.globals = globals;

        this.images = {
            byKey: {},
        };

        this.audio = {
            byKey: {},
        }

        this.events = {};
    }

    private addImage(key: string, image: HTMLImageElement) {
        console.log(`key: ${key}, image: ${image}`);
        this.images.byKey[key] = image;
    }

    private addAudio(key: string, audio: HTMLAudioElement) {
        this.audio.byKey[key] = audio;
    }

    private loadImagesFromImageFolder() {
        const files = fileHelpers.getFilesRecursively(this.globals.imageFolder);
        files.forEach((filename) => {
            if (this.globals.allowedImageTypes.includes(filename.split('.').pop() ?? '')) {
                imagesToLoad += 1;
                const key = filename.replace(this.globals.imageFolder, '').replace(/\\/g, '/');
                this.addImage(key, document.createElement('img'));
                this.images.byKey[key].src = filename;
                this.images.byKey[key].onload = () => { imagesLoaded += 1; };
            }
        });
    }

    private loadAudioFromAudioFolder() {
        const files = fileHelpers.getFilesRecursively(this.globals.audioFolder);
        files.forEach((filename) => {
            if (this.globals.allowedAudioTypes.includes(filename.split('.').pop() ?? '')) {
                audioToLoad += 1;
                const key = filename.replace(this.globals.audioFolder, '');
                this.addAudio(key, document.createElement('audio'));
                this.audio.byKey[key].src = filename;
                this.audio.byKey[key].oncanplaythrough = () => { audioLoaded += 1}
            }
        });
    }

    loadAllAssetsThen(afterLoadFunction: () => unknown) {
        this.afterLoadFunction = afterLoadFunction;
        this.loadImagesFromImageFolder();
        this.loadAudioFromAudioFolder();
        console.log('Loading assets...');
        if (imagesToLoad + audioToLoad === 0) {
            console.log('...no assets found.');
        } else {
            setTimeout(() => { this.checkAllAssetsLoaded() }, 100);
        }
    }

    checkAllAssetsLoaded() {
        const totalToLoad = audioToLoad + imagesToLoad;
        const totalLoaded = audioLoaded + imagesLoaded;
        if (totalLoaded === totalToLoad) {
            console.log('...all assets loaded');
            if (typeof this.afterLoadFunction === 'function') {
                console.log('!!!!afterload')
                this.afterLoadFunction();
            }
        } else {
            console.log(`...${(Math.round(totalLoaded / totalToLoad * 100))}%`);
            setTimeout(() => { this.checkAllAssetsLoaded }, 100);
        }
    }
}