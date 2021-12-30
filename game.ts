import { GameData } from './game-data/game-data';
import { Renderer } from './rendering/renderer';
import * as displayHelpers from './util/display-helpers';

type ElectronicaGameOptions = {
    /** Main <canvas> element for the game to render to */
    canvas: HTMLCanvasElement;
    /** Allowed extensions on image files (defaults to ['png', 'jpg'] if unspecified) */
    allowedImageTypes?: string[];
    /** Allowed extensions on audio files (defaults to ['mp3', 'wav'] if unspecified) */
    allowedAudioTypes?: string[];
};

export class ElectronicaGame {
    data: GameData;
    renderer: Renderer;

    constructor(options: ElectronicaGameOptions) {
        this.data = new GameData({
            imageFolder: 'assets\\images\\',
            audioFolder: 'assets\\audio\\',
            screenInfo: displayHelpers.getScreenInfo(),
            allowedImageTypes: options.allowedImageTypes ?? ['png', 'jpg'],
            allowedAudioTypes: options.allowedAudioTypes ?? ['mp3', 'wav']
        });
        this.renderer = new Renderer(options.canvas, this.data);
        this.data.loadAllAssets().then(() => {

        });
    }
}