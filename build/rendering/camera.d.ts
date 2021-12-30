export declare class CameraID {
    number: number;
    constructor();
}
export declare type CameraData = {
    w: number;
    h: number;
    zoom?: number;
    on?: boolean;
};
export declare class Camera {
    id: CameraID;
    w: number;
    h: number;
    zoom: number;
    on: boolean;
    constructor(data: CameraData);
    static byId(id: CameraID): Camera;
}
