import { GameData } from "../game-data/game-data";
import { Scene } from "../scenes/scene";
import { Camera } from "./camera";
export declare class Renderer {
    private canvas;
    private context;
    private data;
    private images;
    constructor(canvas: HTMLCanvasElement, gameData: GameData);
    /**
     * The main rendering function. Renders all on-screen RenderNodes in scene supplied as viewed by the camera supplied
     */
    render(scene: Scene, camera: Camera): void;
}
