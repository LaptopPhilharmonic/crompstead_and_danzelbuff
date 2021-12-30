import { GameData } from "../game-data/game-data";
import { Scene } from "../scenes/scene";
import { Camera } from "./camera";

export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private data: GameData;
    private images: { [index: string]: HTMLImageElement };

    constructor(canvas: HTMLCanvasElement, gameData: GameData) {
        this.canvas = canvas;
        const possibleContext = this.canvas.getContext("2d");
        if (possibleContext === null) {
            throw new Error('Could not get 2D context for <canvas> element');
        }
        this.context = possibleContext;
        this.data = gameData;
        this.images = {}
    }

    /**
     * The main scene rendering function. Renders all on-screen RenderNodes in scene supplied as viewed by the camera supplied
     */
    renderScene(scene: Scene, camera: Camera) {

    }
}