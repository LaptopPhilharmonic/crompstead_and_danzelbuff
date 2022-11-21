import { RenderNodeID, InputData } from "../import-manager.js";
import { Maybe } from "../util/typescript-helpers.js";
export interface ThingData {
    uniqueName?: string;
    parent?: ThingID;
    children?: ThingID[];
    renderNodes?: RenderNodeID[];
}
export declare class ThingID {
    number: number;
    constructor();
}
/** A unique name for a Thing in the engine. Will throw errors if the name is a duplicate */
export declare class ThingName {
    value: string;
    constructor(name: string);
}
export declare class Thing {
    id: ThingID;
    uniqueName?: ThingName;
    parentId?: ThingID;
    childIds: ThingID[];
    renderNodeIds: RenderNodeID[];
    constructor(data?: ThingData);
    get hasChildren(): boolean;
    get parent(): Maybe<Thing>;
    addChild(child: Thing | ThingID): void;
    addChildren(children: Thing[] | ThingID[]): void;
    removeChild(child: Thing | ThingID): void;
    removeChildren(children: Thing[] | ThingID[]): void;
    forEachChild(fn: (child: Thing) => unknown): void;
    /** Remove all automatically generated references to this thing and any children it has */
    delete(): void;
    /** This is called every cycle of the game engine. Over-write in subclasses to make things do things */
    update(frameTimeStamp: number): void;
    /** This is called every cycle of the game engine. Over-write in subclasses to handle input if needed */
    handleInput(inputData: InputData): void;
    static byId(id: ThingID): Maybe<Thing>;
    static byName(name: ThingName): Maybe<Thing>;
    static forEach(fn: (thing: Thing) => unknown): void;
}
