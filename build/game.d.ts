import { GameData } from './game-data/game-data';
import { Renderer } from './rendering/renderer';
declare type ElectronicaGameOptions = {
    /** Main <canvas> element for the game to render to */
    canvas: HTMLCanvasElement;
    /** Allowed extensions on image files (defaults to ['png', 'jpg'] if unspecified) */
    allowedImageTypes?: string[];
    /** Allowed extensions on audio files (defaults to ['mp3', 'wav'] if unspecified) */
    allowedAudioTypes?: string[];
};
export declare class ElectronicaGame {
    data: GameData;
    renderer: Renderer;
    constructor(options: ElectronicaGameOptions);
}
export {};
