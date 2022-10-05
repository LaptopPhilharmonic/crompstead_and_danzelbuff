import { GameData } from './import-manager.js';
import { Renderer } from './import-manager.js';
declare type ElectronicaGameOptions = {
    /** Main <canvas> element for the game to render to */
    canvas: HTMLCanvasElement;
    /** Allowed extensions on image files (defaults to ['png', 'jpg'] if unspecified) */
    allowedImageTypes?: string[];
    /** Allowed extensions on audio files (defaults to ['mp3', 'wav'] if unspecified) */
    allowedAudioTypes?: string[];
    /** Target framerate for the game to render at. Default is 30. */
    frameRate?: number;
    /** Default false. False = chunky pixels, true = blurry. */
    imageSmoothing?: boolean;
};
/** A reference to the global GameData instance, used all over the shop for context */
export declare let gameData: GameData;
export declare class ElectronicaGame {
    data: GameData;
    renderer: Renderer;
    constructor(options: ElectronicaGameOptions);
}
export {};
