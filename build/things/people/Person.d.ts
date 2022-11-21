import { Thing, ThingData, AnimationNode, ImageNode, SceneID, Location, InputData, RenderNodeID, RenderNode, Action } from '../../import-manager.js';
import { Maybe } from '../../util/typescript-helpers.js';
export declare type Direction = 'up' | 'down' | 'left' | 'right';
export interface Directional<T> {
    up: T;
    down: T;
    left: T;
    right: T;
}
export interface PersonRenderNodes {
    standing: Directional<ImageNode>;
    walking: Directional<AnimationNode>;
}
export declare type PersonData = ThingData & {
    firstName: string;
    surname: string;
    jobTitle: string;
    imgFolder: string;
};
export declare class Person extends Thing {
    firstName: string;
    surname: string;
    jobTitle: string;
    imgFolder: string;
    renderNodes: PersonRenderNodes;
    direction: Direction;
    private currentRenderNodeId;
    gridX: number;
    gridY: number;
    private locationId;
    acceptingInput: boolean;
    private actionQueue;
    private static spriteOffsetX;
    private static spriteOffsetY;
    constructor(data: PersonData);
    private makeDirectionalImage;
    private makeDirectionalAnimation;
    get location(): Maybe<Location>;
    get currentAction(): Maybe<Action>;
    /** Moves this person to the Location specified, updation any current Location and the new Location objects as appropriate */
    goesTo(location: Location | SceneID, gridX: number, gridY: number): void;
    snapCurrentRenderNodeToGrid(): void;
    handleInput(input: InputData): void;
    /** Queue up an action */
    addAction(action: Action): void;
    /** Queue up a list of actions (they will be in the order provided) */
    addActions(actions: Action[]): void;
    private walks;
    walksUp(squares?: number): Person;
    walksDown(squares?: number): Person;
    walksLeft(squares?: number): Person;
    walksRight(squares?: number): Person;
    private canWalkTo;
    get canWalkUp(): boolean;
    get canWalkDown(): boolean;
    get canWalkLeft(): boolean;
    get canWalkRight(): boolean;
    update(frameTimeStamp: number): void;
    /** The current RenderNode always gets put in the Location of this Person */
    set currentRenderNode(node: RenderNode | RenderNodeID);
    get currentRenderNode(): RenderNode;
}
