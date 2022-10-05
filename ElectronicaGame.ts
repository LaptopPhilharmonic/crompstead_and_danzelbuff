import { GameData } from './import-manager.js';
import { Renderer } from './import-manager.js';
import { stationLobby } from './import-manager.js';
import { Camera } from './import-manager.js';
import * as displayHelpers from './util/display-helpers.js';

type ElectronicaGameOptions = {
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
export let gameData: GameData;

export class ElectronicaGame {
    data: GameData;
    renderer: Renderer;

    constructor(options: ElectronicaGameOptions) {
        this.data = new GameData({
            imageFolder: 'assets\\images\\',
            audioFolder: 'assets\\audio\\',
            screenInfo: displayHelpers.getScreenInfo(),
            allowedImageTypes: options.allowedImageTypes ?? ['png', 'jpg'],
            allowedAudioTypes: options.allowedAudioTypes ?? ['mp3', 'wav'],
            frameRate: options.frameRate ?? 30,
            imageSmoothing: options.imageSmoothing ?? false,
        });

        gameData = this.data;
        const dpr = gameData.globals.screenInfo.devicePixelRatio;
        
        options.canvas.width = this.data.globals.screenInfo.width * dpr;
        options.canvas.height = this.data.globals.screenInfo.height * dpr;
        options.canvas.style.width = (this.data.globals.screenInfo.width) + 'px';
        options.canvas.style.height = (this.data.globals.screenInfo.height) + 'px';

        // options.canvas.width = options.canvas.offsetWidth;
        // options.canvas.height = options.canvas.offsetHeight;

        this.renderer = new Renderer(options.canvas);
        this.data.loadAllAssetsThen(() => {
            this.data.currentScene = stationLobby.init();

            let quit = false;
            let lastRender = 0;
            const frameLength = Math.round(1000 / this.data.globals.frameRate);
            const camera = new Camera({x: 0, y: 0, zoom: 3});

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
            }

            setTimeout(loop, 10);
        });
    }
}