import { Scene } from "../import-manager.js";
export declare class CameraID {
    number: number;
    constructor();
}
export declare type CameraData = {
    x: number;
    y: number;
    zoom?: number;
    on?: boolean;
};
export declare class Camera {
    id: CameraID;
    x: number;
    y: number;
    zoom: number;
    on: boolean;
    constructor(data: CameraData);
    static byId(id: CameraID): Camera;
    centreOnScene(scene: Scene): void;
}
