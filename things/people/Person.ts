import { Thing, ThingData, AnimationNode, ImageNode, SceneID, Location, Scene, InputData, RenderNodeID, RenderNode, Action, Walk, WalkDirection } from '../../import-manager.js';
import { Maybe, definitely } from '../../util/typescript-helpers.js';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Directional<T> {
    up: T,
    down: T,
    left: T,
    right: T,
}

export interface PersonRenderNodes {
    standing: Directional<ImageNode>,
    walking: Directional<AnimationNode>,
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
    gridX: number = 0;
    gridY: number = 0;
    private locationId: Maybe<SceneID>;
    acceptingInput: boolean = false;
    private actionQueue: Action[];
    private static spriteOffsetX: number = -24;
    private static spriteOffsetY: number = -38;

    constructor(data: PersonData) {
        super(data);
        this.firstName = data.firstName;
        this.surname = data.surname;
        this.jobTitle = data.jobTitle;
        this.imgFolder = data.imgFolder;
        this.renderNodes = {
            standing: this.makeDirectionalImage('standing'),
            walking: this.makeDirectionalAnimation('walking', 64, 64, 200, true)
        }
        this.currentRenderNodeId = this.renderNodes.standing.down.id;
        this.actionQueue = [];
        this.direction = 'down';
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

        this.locationId = location instanceof Location ? location.id : location;

        currentLocation?.removeRenderNode(this.currentRenderNode);
        currentLocation?.grid.removeThing(this);

        newLocation.addRenderNode(this.currentRenderNode);
        newLocation.grid.getSquare(gridX, gridY)?.addThing(this);
        this.gridX = gridX;
        this.gridY = gridY;
        this.snapCurrentRenderNodeToGrid();
    }

    snapCurrentRenderNodeToGrid() {
        this.currentRenderNode.setX(this.gridX * (this.location?.gridSize ?? 1));
        this.currentRenderNode.setY(this.gridY * (this.location?.gridSize ?? 1));
    }

    override handleInput(input: InputData) {
        if (this.acceptingInput && (!this.currentAction || this.currentAction.complete)) {
            if (input.up.held) {
                this.direction = 'up';
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
        for (let i = 0; i < squares; i += 1) {
            this.addAction(new Walk(this, direction));
        }
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
        if (this.currentAction) {
            if (!this.currentAction.inProgress && !this.currentAction.complete) {
                this.currentAction.start();
            }
            if (this.currentAction.complete) {
                this.actionQueue.shift();
                this.update(frameTimeStamp);
            } else {
                this.currentAction.update(frameTimeStamp);
            }
        } else { // Idle
            this.currentRenderNode = this.renderNodes.standing[this.direction];
            this.snapCurrentRenderNodeToGrid();
        }
    }

    /** The current RenderNode always gets put in the Location of this Person */
    set currentRenderNode(node: RenderNode | RenderNodeID) {
        if (this.currentRenderNodeId) {
            this.location?.removeRenderNode(this.currentRenderNodeId)
        }
        if (node instanceof RenderNode) {
            this.currentRenderNodeId = node.id;
        } else {
            this.currentRenderNodeId = node;
        }
        this.location?.addRenderNode(this.currentRenderNodeId);
    }

    get currentRenderNode(): RenderNode {
        return definitely(RenderNode.byId(this.currentRenderNodeId));
    }
}