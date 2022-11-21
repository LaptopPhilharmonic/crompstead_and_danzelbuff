import { Scene } from '../import-manager.js';
import type { ScreenInfo } from '../util/display-helpers.js';
/**
 * All the images that have been loaded into the game
 */
declare type ImageData = {
    /** All images, indexed by their URL, relative to /images */
    byKey: {
        [index: string]: HTMLImageElement;
    };
};
/**
 * All the audio files that have been loaded into the game
 */
declare type AudioData = {
    /** All audio files, indexed by their URL, relative to /images */
    byKey: {
        [index: string]: HTMLAudioElement;
    };
};
/**
 * Info that is true and valid whatever part of the game code we're in
 */
declare type GlobalData = {
    imageFolder: string;
    audioFolder: string;
    screenInfo: ScreenInfo;
    allowedImageTypes: string[];
    allowedAudioTypes: string[];
    frameRate: number;
    imageSmoothing: boolean;
};
declare type EventsData = {};
export declare class GameData {
    events: EventsData;
    globals: GlobalData;
    images: ImageData;
    audio: AudioData;
    currentScene?: Scene;
    afterLoadFunction?: () => unknown;
    frameLengthMillis: number;
    constructor(globals: GlobalData);
    private addImage;
    private addAudio;
    private loadImagesFromImageFolder;
    private loadAudioFromAudioFolder;
    loadAllAssetsThen(afterLoadFunction: () => unknown): void;
    checkAllAssetsLoaded(): void;
}
export {};
