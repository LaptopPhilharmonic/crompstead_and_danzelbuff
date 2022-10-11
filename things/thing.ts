import { RenderNodeID } from "../import-manager.js";
import { Maybe } from "../util/typescript-helpers.js";

let nextId = 1;

/**  All Things are stored here for lookup by id */
const allThings: {[key: number]: Thing} = {};

/** Any Thing created or assigned a unique name is referenced here */
const allThingsByName: {[key: string]: Thing} = {};

export type ThingData = {
    uniqueName?: string;
    parent?: ThingID;
    children: ThingID[];
    renderNodes: RenderNodeID[];
}

export class ThingID {
    number: number;

    constructor() {
        this.number = nextId;
        nextId += 1;
    }
}

/** A unique name for a Thing in the engine. Will throw errors if the name is a duplicate */
export class ThingName {
    value: string;

    constructor(name: string) {
        this.value = name;
    }
}

export class Thing {
    id: ThingID;
    uniqueName?: ThingName;
    parentId?: ThingID;
    childIds: ThingID[];
    renderNodeIds: RenderNodeID[];

    constructor(data: ThingData) {
        this.id = new ThingID();
        this.parentId = data.parent;
        this.childIds = data.children ?? [];
        this.renderNodeIds = data.renderNodes ?? [];

        allThings[this.id.number] = this;
        if (data.uniqueName) {
            if (allThingsByName[data.uniqueName] !== undefined) {
                throw new Error(`A Thing with the unique name ${data.uniqueName} already exists`);
            }
            this.uniqueName = new ThingName(data.uniqueName);
            allThingsByName[data.uniqueName] = this;
        }
    }

    get hasChildren(): boolean {
        return this.childIds.length > 0;
    }

    get parent(): Maybe<Thing> {
        return this.parentId ? Thing.byId(this.parentId) : undefined;
    }

    addChild(child: Thing | ThingID) {
        const toAdd = child instanceof Thing ? child.id : child;
        if (toAdd && !this.childIds.includes(toAdd)) {
            this.childIds.push(toAdd);
        }
    }

    addChildren(children: Thing[] | ThingID[]) {
        children.forEach((child) => this.addChild(child));
    }

    removeChild(child: Thing | ThingID) {
        const toRemove = child instanceof Thing ? child.id : child;
        const index = this.childIds.indexOf(toRemove)
        if (toRemove && index !== -1) {
            this.childIds.splice(index, 1);
        }
    }

    removeChildren(children: Thing[] | ThingID[]) {
        children.forEach((child) => this.removeChild(child));
    }

    forEachChild(fn: (child: Thing) => unknown) {
        this.childIds.forEach((id) => {
            const possibleChild = Thing.byId(id);
            if (possibleChild) {
                fn(possibleChild);
            }
        });
    }

    /** Remove all automatically generated references to this thing and any children it has */
    delete() {
        this.forEachChild((child) => child.delete());
        this.parent?.removeChild(this);
        delete allThings[this.id.number];
        if (this.uniqueName) {
            delete allThingsByName[this.uniqueName.value];
        }
    }

    static byId(id: ThingID): Maybe<Thing> {
        return allThings[id.number];
    }

    static byName(name: ThingName): Maybe<Thing> {
        return allThingsByName[name.value];
    }
}