let nextID = 0;

export class CameraID {
    number: number;

    constructor() {
        this.number = nextID;
        nextID += 1;
    }
}

const allCameras: {[key: number]: Camera} = {}

export type CameraData = {
    w: number;
    h: number;
    x: number;
    y: number;
    zoom?: number;
    on?: boolean;
}

export class Camera {
    id: CameraID;
    x: number;
    y: number;
    w: number;
    h: number;
    zoom: number = 1;
    on: boolean = true;

    constructor(data: CameraData) {
        this.id = new CameraID();
        this.w = data.w;
        this.h = data.h;
        this.x = data.x;
        this.y = data.y;
        this.zoom = data.zoom ?? 1;
        this.on = data.on ?? true;

        allCameras[this.id.number] = this;
    }

    static byId(id: CameraID) {
        return allCameras[id.number];
    }
}