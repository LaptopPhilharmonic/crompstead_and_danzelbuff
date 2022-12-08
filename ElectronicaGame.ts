import path from 'path';
import { GameData, InputManager, Thing } from './import-manager.js';
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
            imageFolder: `assets${path.sep}images${path.sep}`,
            audioFolder: `assets${path.sep}audio${path.sep}`,
            screenInfo: displayHelpers.getScreenInfo(),
            allowedImageTypes: options.allowedImageTypes ?? ['png', 'jpg'],
            allowedAudioTypes: options.allowedAudioTypes ?? ['mp3', 'wav'],
            frameRate: options.frameRate ?? 30,
            imageSmoothing: options.imageSmoothing ?? false,
        });

        gameData = this.data;
        const dpr = gameData.globals.screenInfo.devicePixelRatio;

        this.renderer = new Renderer(options.canvas);

        this.data.loadAllAssetsThen(() => {
            this.renderer.handleCanvasResize();

            this.data.currentScene = stationLobby.init();
            console.log('station lobby intted')

            let quit = false;
            let lastRender = 0;
            const frameLength = Math.round(1000 / this.data.globals.frameRate);
            const camera = new Camera({x: 0, y: 0, zoom: 3});
            const inputManager = new InputManager();
            inputManager.listenTo(window);

            camera.centreOnScene(this.data.currentScene);

            const loop = () => {
                const frameTimeStamp = new Date().valueOf();
                if (frameTimeStamp - lastRender > frameLength) {
                    const inputData = inputManager.cycleKeyData();
                    Thing.forEach((thing) => {
                        thing.handleInput(inputData);
                        thing.update(frameTimeStamp);
                    });
                    if (this.data.currentScene) {
                        this.data.currentScene
                        this.renderer.renderScene(this.data.currentScene, camera);
                        lastRender = frameTimeStamp;
                    }
                }
                if (!quit) {
                    const timePassed = new Date().valueOf() - frameTimeStamp;
                    setTimeout(loop, Math.max(gameData.frameLengthMillis - timePassed, 1));
                }
            }

            setTimeout(loop, 10);
        });
    }
}