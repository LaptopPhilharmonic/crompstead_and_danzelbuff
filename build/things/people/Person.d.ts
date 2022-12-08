import { Thing, ThingData, AnimationNode, ImageNode, SceneID, Location, InputData, RenderNodeID, RenderNode, Action, GridSquare } from '../../import-manager.js';
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
    idle1: Directional<AnimationNode>;
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
    private _gridX;
    private _gridY;
    private locationId;
    acceptingInput: boolean;
    private actionQueue;
    private static spriteOffsetX;
    private static spriteOffsetY;
    following: Maybe<Person>;
    followedBy: Maybe<Person>;
    private nextFidgetTime;
    private firstUpdate;
    constructor(data: PersonData);
    private updateFidgetTime;
    private makeDirectionalImage;
    private makeDirectionalAnimation;
    get location(): Maybe<Location>;
    get currentAction(): Maybe<Action>;
    /** Moves this person to the Location specified, updation any current Location and the new Location objects as appropriate */
    goesTo(location: Location | SceneID, gridX: number, gridY: number): void;
    snapCurrentRenderNodeToGrid(): void;
    /** Calling this removes this Person from their current grid-based RenderNode (if they have one), and inserts them into a new one based on location and gridY */
    updateGridRenderSlot(): void;
    /** Adds a Wait action to this Person's queue */
    waits(millis: number): void;
    set gridY(y: number);
    get gridY(): number;
    set gridX(x: number);
    get gridX(): number;
    get gridSquare(): Maybe<GridSquare>;
    handleInput(input: InputData): void;
    /** Queue up an action */
    addAction(action: Action): void;
    /** Queue up a list of actions (they will be in the order provided) */
    addActions(actions: Action[]): void;
    private walks;
    /** Check if this Person's action queue is empty */
    get isIdle(): boolean;
    walksUp(squares?: number): Person;
    walksDown(squares?: number): Person;
    walksLeft(squares?: number): Person;
    walksRight(squares?: number): Person;
    walksTowards(x: number, y: number): void;
    private canWalkTo;
    get canWalkUp(): boolean;
    get canWalkDown(): boolean;
    get canWalkLeft(): boolean;
    get canWalkRight(): boolean;
    update(frameTimeStamp: number): void;
    /** The current RenderNode always gets put in the Location of this Person */
    set currentRenderNode(node: RenderNode | RenderNodeID);
    get currentRenderNode(): RenderNode;
    follows(otherPerson: Person): void;
    stopsFollowing(): void;
    /** Is this person one square up, down, left or right of the other person */
    isNextTo(otherPerson: Person): boolean;
}
