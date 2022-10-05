import { Scene } from "../import-manager.js";
import { gameData } from '../ElectronicaGame.js';

let nextID = 1;

export class CameraID {
    number: number;

    constructor() {
        this.number = nextID;
        nextID += 1;
    }
}

const allCameras: {[key: number]: Camera} = {}

export type CameraData = {
    x: number;
    y: number;
    zoom?: number;
    on?: boolean;
}

export class Camera {
    id: CameraID;
    x: number;
    y: number;
    zoom: number = 1;
    on: boolean = true;

    constructor(data: CameraData) {
        this.id = new CameraID();
        this.x = data.x;
        this.y = data.y;
        this.zoom = data.zoom ?? 1;
        this.on = data.on ?? true;

        allCameras[this.id.number] = this;
    }

    static byId(id: CameraID) {
        return allCameras[id.number];
    }

    centreOnScene(scene: Scene) {
        const screen = gameData.globals.screenInfo;
        this.x = ((scene.w * this.zoom) / 2) - ((screen.width * screen.devicePixelRatio) / 2);
        this.y = ((scene.h * this.zoom) / 2) - ((screen.height * screen.devicePixelRatio) / 2);
    }
}