import { Thing, ThingData, AnimationNode, ImageNode, SceneID, Location, Scene, InputData, RenderNodeID, RenderNode, Action, Walk, WalkDirection, Wait } from '../../import-manager.js';
import { Maybe, definitely } from '../../util/typescript-helpers.js';
import { randomInt } from '../../util/math-heleprs.js';

export type Direction = 'up' | 'down' | 'left' | 'right';
let firstUpdate = true;

export interface Directional<T> {
    up: T,
    down: T,
    left: T,
    right: T,
}

export interface PersonRenderNodes {
    standing: Directional<ImageNode>,
    walking: Directional<AnimationNode>,
    idle1: Directional<AnimationNode>,
}

export type PersonData = ThingData & {
    firstName: string,
    surname: string,
    jobTitle: string,
    imgFolder: string,
}

export class Person extends Thing {
    firstName: string;
    surname: string;
    jobTitle: string;
    imgFolder: string;
    renderNodes: PersonRenderNodes;
    direction: Direction;
    private currentRenderNodeId: RenderNodeID;
    private _gridX: number = 0;
    private _gridY: number = 0;
    private locationId: Maybe<SceneID>;
    acceptingInput: boolean = false;
    private actionQueue: Action[];
    private static spriteOffsetX: number = -24;
    private static spriteOffsetY: number = -38;
    following: Maybe<Person>
    followedBy: Maybe<Person>
    private nextFidgetTime: number;

    constructor(data: PersonData) {
        super(data);
        this.firstName = data.firstName;
        this.surname = data.surname;
        this.jobTitle = data.jobTitle;
        this.imgFolder = data.imgFolder;
        this.renderNodes = {
            standing: this.makeDirectionalImage('standing'),
            walking: this.makeDirectionalAnimation('walking', 64, 64, 200, true),
            idle1: this.makeDirectionalAnimation('idle-1', 64, 64, 200, false)
        }
        this.currentRenderNodeId = this.renderNodes.standing.down.id;
        this.actionQueue = [];
        this.direction = 'down';
        this.nextFidgetTime = Infinity;
    }

    private updateFidgetTime(frameTimeStamp: number) {
        this.nextFidgetTime = frameTimeStamp + (randomInt(5, 15) * 500);
    }

    private makeDirectionalImage(imageType: string): Directional<ImageNode> {
        const imgStart = `people/${this.imgFolder}/${imageType}`;
        return {
            up: new ImageNode({imageName: `${imgStart}-u.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),
            down: new ImageNode({imageName: `${imgStart}-d.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),
            left: new ImageNode({imageName: `${imgStart}-l.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),            
            right: new ImageNode({imageName: `${imgStart}-r.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),            
        }
    }

    private makeDirectionalAnimation(animationType: string, w: number, h: number, frameMillis: number, loops: boolean = true): Directional<AnimationNode> {
        const imgStart = `people/${this.imgFolder}/${animationType}`;
        return {
            up: new AnimationNode({imageName: `${imgStart}-u.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),
            down: new AnimationNode({imageName: `${imgStart}-d.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),            
            left: new AnimationNode({imageName: `${imgStart}-l.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),
            right: new AnimationNode({imageName: `${imgStart}-r.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY}),
        }
    }

    get location(): Maybe<Location> {
        return Scene.byId(this.locationId) as Maybe<Location>;
    }

    get currentAction(): Maybe<Action> {
        return this.actionQueue[0];
    }

    /** Moves this person to the Location specified, updation any current Location and the new Location objects as appropriate */
    goesTo(location: Location | SceneID, gridX: number, gridY: number) {
        const currentLocation = this.location;
        const newLocation = location instanceof Location ? location : Scene.byId(location) as Location;
        
        if (!newLocation) {
            throw new Error(`Invalid Location not provided - argument was ${location}`);
        }

        this.locationId = newLocation.id;

        currentLocation?.grid.removeThing(this);

        newLocation.grid.getSquare(gridX, gridY)?.addThing(this);

        this.gridX = gridX;
        this.gridY = gridY;

        this.currentRenderNode = this.currentRenderNodeId;
        this.snapCurrentRenderNodeToGrid();
    }

    snapCurrentRenderNodeToGrid() {
        this.currentRenderNode.setX(this.gridX * (this.location?.gridSize ?? 1));
        this.currentRenderNode.setY(this.gridY * (this.location?.gridSize ?? 1));
        this.updateGridRenderSlot();
    }

    /** Calling this removes this Person from their current grid-based RenderNode (if they have one), and inserts them into a new one based on location and gridY */
    updateGridRenderSlot() {
        this.location?.addRenderNodeAtY(this.currentRenderNode, this.gridY);
    }

    /** Adds a Wait action to this Person's queue */
    waits(millis: number) {
        this.addAction(new Wait(this, millis));
    }

    set gridY(y: number) {
        this._gridY = y;
        this.updateGridRenderSlot();
        this.snapCurrentRenderNodeToGrid();
    }

    get gridY() {
        return this._gridY;
    }

    set gridX(x: number) {
        this._gridX = x;
        this.snapCurrentRenderNodeToGrid();
    }

    get gridX() {
        return this._gridX;
    }

    override handleInput(input: InputData) {
        if (this.acceptingInput && (!this.currentAction || this.currentAction.complete)) {
            if (input.up.held) {
                this.direction = "up";
                if (this.canWalkUp) {
                    this.walksUp();
                }
            } else if (input.down.held) {
                this.direction = 'down';
                if (this.canWalkDown) {
                    this.walksDown();
                }
            } else if (input.left.held) {
                this.direction = 'left';
                if (this.canWalkLeft) {
                    this.walksLeft();
                }
            } else if (input.right.held) {
                this.direction = 'right';
                if (this.canWalkRight) {
                    this.walksRight();
                }
            }
        }
    }

    /** Queue up an action */
    addAction(action: Action) {
        this.actionQueue.push(action);
    }

    /** Queue up a list of actions (they will be in the order provided) */
    addActions(actions: Action[]) {
        this.actionQueue.concat(actions);
    }

    private walks(direction: WalkDirection, squares: number = 1) {
        this.direction = direction;
        for (let i = 0; i < squares; i += 1) {
            if (this.followedBy) {
                if (this.isIdle && this.followedBy.isIdle) {
                    this.followedBy.waits(100);
                }
                this.followedBy?.walksTowards(this._gridX, this._gridY);
            }
            this.addAction(new Walk(this, direction));
        }
    }

    /** Check if this Person's action queue is empty */
    get isIdle() {
        return this.actionQueue.length === 0;
    }

    walksUp(squares: number = 1): Person {
        this.walks('up', squares);
        return this;
    }

    walksDown(squares: number = 1): Person {
        this.walks('down', squares);
        return this;
    }

    walksLeft(squares: number = 1): Person {
        this.walks('left', squares);
        return this;
    }

    walksRight(squares: number = 1): Person {
        this.walks('right', squares);
        return this;
    }

    walksTowards(x: number, y: number) {
        const xDiff = this.gridX - x;
        const yDiff = this.gridY - y;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff < 0 && this.canWalkRight) {
                this.walksRight();
                return;
            }
            if (xDiff > 0 && this.canWalkLeft) {
                this.walksLeft();
                return;
            }
        }
        if (yDiff < 0 && this.canWalkDown) {
            this.walksDown();
            return;
        }
        if (yDiff > 0 && this.canWalkUp) {
            this.walksUp();
        }
    }

    private canWalkTo(x: number, y: number) {
        return this.location?.grid.getSquare(x, y)?.walkable ?? false;
    }

    get canWalkUp(): boolean {
        return this.canWalkTo(this.gridX, this.gridY - 1);
    }

    get canWalkDown(): boolean {
        return this.canWalkTo(this.gridX, this.gridY + 1);
    }

    get canWalkLeft(): boolean {
        return this.canWalkTo(this.gridX - 1, this.gridY);
    }

    get canWalkRight(): boolean {
        return this.canWalkTo(this.gridX + 1, this.gridY);
    }

    override update(frameTimeStamp: number) {
        if (firstUpdate) {
            this.updateFidgetTime(frameTimeStamp);
        }
        if (this.currentAction) {
            if (!this.currentAction.inProgress && !this.currentAction.complete) {
                this.currentAction.start();
            }
            if (this.currentAction.complete) {
                this.actionQueue.shift();
                if (this.actionQueue.length === 0) { // Going idle...
                    this.updateFidgetTime(frameTimeStamp);
                    this.currentRenderNode = this.renderNodes.standing[this.direction];
                }
                this.update(frameTimeStamp);
            } else {
                this.currentAction.update(frameTimeStamp);
            }
        } else { // Idle
            if (frameTimeStamp > this.nextFidgetTime) {
                const fidgetNode = this.renderNodes.idle1[this.direction];
                fidgetNode.reset();
                this.currentRenderNode = fidgetNode;
                this.updateFidgetTime(frameTimeStamp);
            }
            this.snapCurrentRenderNodeToGrid();
        }

        firstUpdate = false;
    }

    /** The current RenderNode always gets put in the Location of this Person */
    set currentRenderNode(node: RenderNode | RenderNodeID) {
        if (this.currentRenderNodeId) {
            this.currentRenderNode.detach();
        }
        if (node instanceof RenderNode) {
            this.currentRenderNodeId = node.id;
        } else {
            this.currentRenderNodeId = node;
        }
        this.location?.addRenderNodeAtY(this.currentRenderNode, this.gridY);
    }

    get currentRenderNode(): RenderNode {
        return definitely(RenderNode.byId(this.currentRenderNodeId));
    }

    // Tell this person to keep walking after another person
    follows(otherPerson: Person) {
        this.following = otherPerson;
        otherPerson.followedBy = this;
    }

    stopsFollowing() {
        if (this.following?.followedBy) {
            this.following.followedBy = undefined;
        }
        this.following = undefined;
    }

    /** Is this person one square up, down, left or right of the other person */
    isNextTo(otherPerson: Person): boolean {
        if (this.location !== otherPerson.location) {
            return false;
        }
        const xDiff = Math.abs(this.gridX - otherPerson.gridX);
        if (xDiff > 1) {
            return false;
        }
        const yDiff = Math.abs(this.gridY - otherPerson.gridY);
        if (yDiff > 1) {
            return false;
        }
        if (xDiff === 1 && yDiff === 1) {
            return false;
        }
        return true;
    }
}