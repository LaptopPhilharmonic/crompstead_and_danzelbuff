"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const import_manager_js_1 = require("../../import-manager.js");
const typescript_helpers_js_1 = require("../../util/typescript-helpers.js");
const math_heleprs_js_1 = require("../../util/math-heleprs.js");
class Person extends import_manager_js_1.Thing {
    constructor(data) {
        super(data);
        this._gridX = 0;
        this._gridY = 0;
        this.acceptingInput = false;
        this.firstName = data.firstName;
        this.surname = data.surname;
        this.jobTitle = data.jobTitle;
        this.imgFolder = data.imgFolder;
        this.renderNodes = {
            standing: this.makeDirectionalImage('standing'),
            walking: this.makeDirectionalAnimation('walking', 64, 64, 200, true),
            idle1: this.makeDirectionalAnimation('idle-1', 64, 64, 200, false)
        };
        this.currentRenderNodeId = this.renderNodes.standing.down.id;
        this.actionQueue = [];
        this.direction = 'down';
        this.nextFidgetTime = Infinity;
        this.firstUpdate = true;
    }
    updateFidgetTime(frameTimeStamp) {
        this.nextFidgetTime = frameTimeStamp + ((0, math_heleprs_js_1.randomInt)(5, 15) * 500);
    }
    makeDirectionalImage(imageType) {
        const imgStart = `people/${this.imgFolder}/${imageType}`;
        return {
            up: new import_manager_js_1.ImageNode({ imageName: `${imgStart}-u.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
            down: new import_manager_js_1.ImageNode({ imageName: `${imgStart}-d.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
            left: new import_manager_js_1.ImageNode({ imageName: `${imgStart}-l.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
            right: new import_manager_js_1.ImageNode({ imageName: `${imgStart}-r.png`, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
        };
    }
    makeDirectionalAnimation(animationType, w, h, frameMillis, loops = true) {
        const imgStart = `people/${this.imgFolder}/${animationType}`;
        return {
            up: new import_manager_js_1.AnimationNode({ imageName: `${imgStart}-u.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
            down: new import_manager_js_1.AnimationNode({ imageName: `${imgStart}-d.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
            left: new import_manager_js_1.AnimationNode({ imageName: `${imgStart}-l.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
            right: new import_manager_js_1.AnimationNode({ imageName: `${imgStart}-r.png`, w, h, frameMillis, loops, offsetX: Person.spriteOffsetX, offsetY: Person.spriteOffsetY }),
        };
    }
    get location() {
        return import_manager_js_1.Scene.byId(this.locationId);
    }
    get currentAction() {
        return this.actionQueue[0];
    }
    /** Moves this person to the Location specified, updation any current Location and the new Location objects as appropriate */
    goesTo(location, gridX, gridY) {
        var _a;
        const currentLocation = this.location;
        const newLocation = location instanceof import_manager_js_1.Location ? location : import_manager_js_1.Scene.byId(location);
        if (!newLocation) {
            throw new Error(`Invalid Location not provided - argument was ${location}`);
        }
        this.locationId = newLocation.id;
        currentLocation === null || currentLocation === void 0 ? void 0 : currentLocation.grid.removeThing(this);
        (_a = newLocation.grid.getSquare(gridX, gridY)) === null || _a === void 0 ? void 0 : _a.addThing(this);
        this.gridX = gridX;
        this.gridY = gridY;
        this.currentRenderNode = this.currentRenderNodeId;
        this.snapCurrentRenderNodeToGrid();
    }
    snapCurrentRenderNodeToGrid() {
        var _a, _b, _c, _d;
        this.currentRenderNode.setX(this.gridX * ((_b = (_a = this.location) === null || _a === void 0 ? void 0 : _a.gridSize) !== null && _b !== void 0 ? _b : 1));
        this.currentRenderNode.setY(this.gridY * ((_d = (_c = this.location) === null || _c === void 0 ? void 0 : _c.gridSize) !== null && _d !== void 0 ? _d : 1));
        this.updateGridRenderSlot();
    }
    /** Calling this removes this Person from their current grid-based RenderNode (if they have one), and inserts them into a new one based on location and gridY */
    updateGridRenderSlot() {
        var _a;
        (_a = this.location) === null || _a === void 0 ? void 0 : _a.addRenderNodeAtY(this.currentRenderNode, this.gridY);
    }
    /** Adds a Wait action to this Person's queue */
    waits(millis) {
        this.addAction(new import_manager_js_1.Wait(this, millis));
    }
    set gridY(y) {
        this._gridY = y;
        this.updateGridRenderSlot();
        this.snapCurrentRenderNodeToGrid();
    }
    get gridY() {
        return this._gridY;
    }
    set gridX(x) {
        this._gridX = x;
        this.snapCurrentRenderNodeToGrid();
    }
    get gridX() {
        return this._gridX;
    }
    get gridSquare() {
        var _a;
        return (_a = this.location) === null || _a === void 0 ? void 0 : _a.grid.getSquare(this.gridX, this.gridY);
    }
    handleInput(input) {
        if (this.acceptingInput && (!this.currentAction || this.currentAction.complete)) {
            if (input.up.held) {
                this.direction = "up";
                if (this.canWalkUp) {
                    this.walksUp();
                }
            }
            else if (input.down.held) {
                this.direction = 'down';
                if (this.canWalkDown) {
                    this.walksDown();
                }
            }
            else if (input.left.held) {
                this.direction = 'left';
                if (this.canWalkLeft) {
                    this.walksLeft();
                }
            }
            else if (input.right.held) {
                this.direction = 'right';
                if (this.canWalkRight) {
                    this.walksRight();
                }
            }
        }
    }
    /** Queue up an action */
    addAction(action) {
        this.actionQueue.push(action);
    }
    /** Queue up a list of actions (they will be in the order provided) */
    addActions(actions) {
        this.actionQueue.concat(actions);
    }
    walks(direction, squares = 1) {
        this.direction = direction;
        for (let i = 0; i < squares; i += 1) {
            this.addAction(new import_manager_js_1.Walk(this, direction));
        }
    }
    /** Check if this Person's action queue is empty */
    get isIdle() {
        return this.actionQueue.length === 0;
    }
    walksUp(squares = 1) {
        this.walks('up', squares);
        return this;
    }
    walksDown(squares = 1) {
        this.walks('down', squares);
        return this;
    }
    walksLeft(squares = 1) {
        this.walks('left', squares);
        return this;
    }
    walksRight(squares = 1) {
        this.walks('right', squares);
        return this;
    }
    walksTowards(x, y) {
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
    canWalkTo(x, y) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.location) === null || _a === void 0 ? void 0 : _a.grid.getSquare(x, y)) === null || _b === void 0 ? void 0 : _b.walkable) !== null && _c !== void 0 ? _c : false;
    }
    get canWalkUp() {
        return this.canWalkTo(this.gridX, this.gridY - 1);
    }
    get canWalkDown() {
        return this.canWalkTo(this.gridX, this.gridY + 1);
    }
    get canWalkLeft() {
        return this.canWalkTo(this.gridX - 1, this.gridY);
    }
    get canWalkRight() {
        return this.canWalkTo(this.gridX + 1, this.gridY);
    }
    update(frameTimeStamp) {
        if (this.firstUpdate) {
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
            }
            else {
                this.currentAction.update(frameTimeStamp);
            }
        }
        else { // Idle
            if (frameTimeStamp > this.nextFidgetTime) {
                if (this.following && this.location === this.following.location) {
                    const route = (0, typescript_helpers_js_1.definitely)(this.location).grid.findPath({ x: this.gridX, y: this.gridY }, { x: this.following.gridX, y: this.following.gridY });
                    route.forEach((r, index) => {
                        var _a;
                        const compareTo = (_a = route[index - 1]) !== null && _a !== void 0 ? _a : this.gridSquare;
                        if (r.y > compareTo.y) {
                            this.walksDown();
                        }
                        else if (r.y < compareTo.y) {
                            this.walksUp();
                        }
                        else if (r.x < compareTo.x) {
                            this.walksLeft();
                        }
                        else if (r.x > compareTo.x) {
                            this.walksRight();
                        }
                    });
                    if (route.length === 0) {
                        this.goesTo((0, typescript_helpers_js_1.definitely)(this.following.location), this.following.gridX, this.following.gridY);
                    }
                }
                else {
                    const fidgetNode = this.renderNodes.idle1[this.direction];
                    fidgetNode.reset();
                    this.currentRenderNode = fidgetNode;
                }
                this.updateFidgetTime(frameTimeStamp);
            }
            this.snapCurrentRenderNodeToGrid();
        }
        this.firstUpdate = false;
    }
    /** The current RenderNode always gets put in the Location of this Person */
    set currentRenderNode(node) {
        var _a;
        if (this.currentRenderNodeId) {
            this.currentRenderNode.detach();
        }
        if (node instanceof import_manager_js_1.RenderNode) {
            this.currentRenderNodeId = node.id;
        }
        else {
            this.currentRenderNodeId = node;
        }
        (_a = this.location) === null || _a === void 0 ? void 0 : _a.addRenderNodeAtY(this.currentRenderNode, this.gridY);
    }
    get currentRenderNode() {
        return (0, typescript_helpers_js_1.definitely)(import_manager_js_1.RenderNode.byId(this.currentRenderNodeId));
    }
    // Tell this person to keep walking after another person
    follows(otherPerson) {
        this.following = otherPerson;
        otherPerson.followedBy = this;
    }
    stopsFollowing() {
        var _a;
        if ((_a = this.following) === null || _a === void 0 ? void 0 : _a.followedBy) {
            this.following.followedBy = undefined;
        }
        this.following = undefined;
    }
    /** Is this person one square up, down, left or right of the other person */
    isNextTo(otherPerson) {
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
exports.Person = Person;
Person.spriteOffsetX = -24;
Person.spriteOffsetY = -38;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGhpbmdzL3Blb3BsZS9QZXJzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQW1NO0FBQ25NLDRFQUFxRTtBQUNyRSxnRUFBdUQ7QUF3QnZELE1BQWEsTUFBTyxTQUFRLHlCQUFLO0lBb0I3QixZQUFZLElBQWdCO1FBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQWJSLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUUzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVc1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDO1lBQy9DLE9BQU8sRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztZQUNwRSxLQUFLLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDckUsQ0FBQTtRQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFB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aW1hdGlvbk5vZGUsIEltYWdlTm9kZSwgU2NlbmVJRCwgTG9jYXRpb24sIFNjZW5lLCBJbnB1dERhdGEsIFJlbmRlck5vZGVJRCwgUmVuZGVyTm9kZSwgQWN0aW9uLCBXYWxrLCBXYWxrRGlyZWN0aW9uLCBXYWl0LCBHcmlkU3F1YXJlIH0gZnJvbSAnLi4vLi4vaW1wb3J0LW1hbmFnZXIuanMnO1xyXG5pbXBvcnQgeyBNYXliZSwgZGVmaW5pdGVseSB9IGZyb20gJy4uLy4uL3V0aWwvdHlwZXNjcmlwdC1oZWxwZXJzLmpzJztcclxuaW1wb3J0IHsgcmFuZG9tSW50IH0gZnJvbSAnLi4vLi4vdXRpbC9tYXRoLWhlbGVwcnMuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgRGlyZWN0aW9uID0gJ3VwJyB8ICdkb3duJyB8ICdsZWZ0JyB8ICdyaWdodCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdGlvbmFsPFQ+IHtcclxuICAgIHVwOiBULFxyXG4gICAgZG93bjogVCxcclxuICAgIGxlZnQ6IFQsXHJcbiAgICByaWdodDogVCxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQZXJzb25SZW5kZXJOb2RlcyB7XHJcbiAgICBzdGFuZGluZzogRGlyZWN0aW9uYWw8SW1hZ2VOb2RlPixcclxuICAgIHdhbGtpbmc6IERpcmVjdGlvbmFsPEFuaW1hdGlvbk5vZGU+LFxyXG4gICAgaWRsZTE6IERpcmVjdGlvbmFsPEFuaW1hdGlvbk5vZGU+LFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQZXJzb25EYXRhID0gVGhpbmdEYXRhICYge1xyXG4gICAgZmlyc3ROYW1lOiBzdHJpbmcsXHJcbiAgICBzdXJuYW1lOiBzdHJpbmcsXHJcbiAgICBqb2JUaXRsZTogc3RyaW5nLFxyXG4gICAgaW1nRm9sZGVyOiBzdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJzb24gZXh0ZW5kcyBUaGluZyB7XHJcbiAgICBmaXJzdE5hbWU6IHN0cmluZztcclxuICAgIHN1cm5hbWU6IHN0cmluZztcclxuICAgIGpvYlRpdGxlOiBzdHJpbmc7XHJcbiAgICBpbWdGb2xkZXI6IHN0cmluZztcclxuICAgIHJlbmRlck5vZGVzOiBQZXJzb25SZW5kZXJOb2RlcztcclxuICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50UmVuZGVyTm9kZUlkOiBSZW5kZXJOb2RlSUQ7XHJcbiAgICBwcml2YXRlIF9ncmlkWDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2dyaWRZOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbklkOiBNYXliZTxTY2VuZUlEPjtcclxuICAgIGFjY2VwdGluZ0lucHV0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGFjdGlvblF1ZXVlOiBBY3Rpb25bXTtcclxuICAgIHByaXZhdGUgc3RhdGljIHNwcml0ZU9mZnNldFg6IG51bWJlciA9IC0yNDtcclxuICAgIHByaXZhdGUgc3RhdGljIHNwcml0ZU9mZnNldFk6IG51bWJlciA9IC0zODtcclxuICAgIGZvbGxvd2luZzogTWF5YmU8UGVyc29uPlxyXG4gICAgZm9sbG93ZWRCeTogTWF5YmU8UGVyc29uPlxyXG4gICAgcHJpdmF0ZSBuZXh0RmlkZ2V0VGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmaXJzdFVwZGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBQZXJzb25EYXRhKSB7XHJcbiAgICAgICAgc3VwZXIoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSBkYXRhLmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLnN1cm5hbWUgPSBkYXRhLnN1cm5hbWU7XHJcbiAgICAgICAgdGhpcy5qb2JUaXRsZSA9IGRhdGEuam9iVGl0bGU7XHJcbiAgICAgICAgdGhpcy5pbWdGb2xkZXIgPSBkYXRhLmltZ0ZvbGRlcjtcclxuICAgICAgICB0aGlzLnJlbmRlck5vZGVzID0ge1xyXG4gICAgICAgICAgICBzdGFuZGluZzogdGhpcy5tYWtlRGlyZWN0aW9uYWxJbWFnZSgnc3RhbmRpbmcnKSxcclxuICAgICAgICAgICAgd2Fsa2luZzogdGhpcy5tYWtlRGlyZWN0aW9uYWxBbmltYXRpb24oJ3dhbGtpbmcnLCA2NCwgNjQsIDIwMCwgdHJ1ZSksXHJcbiAgICAgICAgICAgIGlkbGUxOiB0aGlzLm1ha2VEaXJlY3Rpb25hbEFuaW1hdGlvbignaWRsZS0xJywgNjQsIDY0LCAyMDAsIGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJlbnRSZW5kZXJOb2RlSWQgPSB0aGlzLnJlbmRlck5vZGVzLnN0YW5kaW5nLmRvd24uaWQ7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG4gICAgICAgIHRoaXMubmV4dEZpZGdldFRpbWUgPSBJbmZpbml0eTtcclxuICAgICAgICB0aGlzLmZpcnN0VXBkYXRlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUZpZGdldFRpbWUoZnJhbWVUaW1lU3RhbXA6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubmV4dEZpZGdldFRpbWUgPSBmcmFtZVRpbWVTdGFtcCArIChyYW5kb21JbnQoNSwgMTUpICogNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1ha2VEaXJlY3Rpb25hbEltYWdlKGltYWdlVHlwZTogc3RyaW5nKTogRGlyZWN0aW9uYWw8SW1hZ2VOb2RlPiB7XHJcbiAgICAgICAgY29uc3QgaW1nU3RhcnQgPSBgcGVvcGxlLyR7dGhpcy5pbWdGb2xkZXJ9LyR7aW1hZ2VUeXBlfWA7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdXA6IG5ldyBJbWFnZU5vZGUoe2ltYWdlTmFtZTogYCR7aW1nU3RhcnR9LXUucG5nYCwgb2Zmc2V0WDogUGVyc29uLnNwcml0ZU9mZnNldFgsIG9mZnNldFk6IFBlcnNvbi5zcHJpdGVPZmZzZXRZfSksXHJcbiAgICAgICAgICAgIGRvd246IG5ldyBJbWFnZU5vZGUoe2ltYWdlTmFtZTogYCR7aW1nU3RhcnR9LWQucG5nYCwgb2Zmc2V0WDogUGVyc29uLnNwcml0ZU9mZnNldFgsIG9mZnNldFk6IFBlcnNvbi5zcHJpdGVPZmZzZXRZfSksXHJcbiAgICAgICAgICAgIGxlZnQ6IG5ldyBJbWFnZU5vZGUoe2ltYWdlTmFtZTogYCR7aW1nU3RhcnR9LWwucG5nYCwgb2Zmc2V0WDogUGVyc29uLnNwcml0ZU9mZnNldFgsIG9mZnNldFk6IFBlcnNvbi5zcHJpdGVPZmZzZXRZfSksICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJpZ2h0OiBuZXcgSW1hZ2VOb2RlKHtpbWFnZU5hbWU6IGAke2ltZ1N0YXJ0fS1yLnBuZ2AsIG9mZnNldFg6IFBlcnNvbi5zcHJpdGVPZmZzZXRYLCBvZmZzZXRZOiBQZXJzb24uc3ByaXRlT2Zmc2V0WX0pLCAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1ha2VEaXJlY3Rpb25hbEFuaW1hdGlvbihhbmltYXRpb25UeXBlOiBzdHJpbmcsIHc6IG51bWJlciwgaDogbnVtYmVyLCBmcmFtZU1pbGxpczogbnVtYmVyLCBsb29wczogYm9vbGVhbiA9IHRydWUpOiBEaXJlY3Rpb25hbDxBbmltYXRpb25Ob2RlPiB7XHJcbiAgICAgICAgY29uc3QgaW1nU3RhcnQgPSBgcGVvcGxlLyR7dGhpcy5pbWdGb2xkZXJ9LyR7YW5pbWF0aW9uVHlwZX1gO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHVwOiBuZXcgQW5pbWF0aW9uTm9kZSh7aW1hZ2VOYW1lOiBgJHtpbWdTdGFydH0tdS5wbmdgLCB3LCBoLCBmcmFtZU1pbGxpcywgbG9vcHMsIG9mZnNldFg6IFBlcnNvbi5zcHJpdGVPZmZzZXRYLCBvZmZzZXRZOiBQZXJzb24uc3ByaXRlT2Zmc2V0WX0pLFxyXG4gICAgICAgICAgICBkb3duOiBuZXcgQW5pbWF0aW9uTm9kZSh7aW1hZ2VOYW1lOiBgJHtpbWdTdGFydH0tZC5wbmdgLCB3LCBoLCBmcmFtZU1pbGxpcywgbG9vcHMsIG9mZnNldFg6IFBlcnNvbi5zcHJpdGVPZmZzZXRYLCBvZmZzZXRZOiBQZXJzb24uc3ByaXRlT2Zmc2V0WX0pLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZWZ0OiBuZXcgQW5pbWF0aW9uTm9kZSh7aW1hZ2VOYW1lOiBgJHtpbWdTdGFydH0tbC5wbmdgLCB3LCBoLCBmcmFtZU1pbGxpcywgbG9vcHMsIG9mZnNldFg6IFBlcnNvbi5zcHJpdGVPZmZzZXRYLCBvZmZzZXRZOiBQZXJzb24uc3ByaXRlT2Zmc2V0WX0pLFxyXG4gICAgICAgICAgICByaWdodDogbmV3IEFuaW1hdGlvbk5vZGUoe2ltYWdlTmFtZTogYCR7aW1nU3RhcnR9LXIucG5nYCwgdywgaCwgZnJhbWVNaWxsaXMsIGxvb3BzLCBvZmZzZXRYOiBQZXJzb24uc3ByaXRlT2Zmc2V0WCwgb2Zmc2V0WTogUGVyc29uLnNwcml0ZU9mZnNldFl9KSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxvY2F0aW9uKCk6IE1heWJlPExvY2F0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIFNjZW5lLmJ5SWQodGhpcy5sb2NhdGlvbklkKSBhcyBNYXliZTxMb2NhdGlvbj47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1cnJlbnRBY3Rpb24oKTogTWF5YmU8QWN0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uUXVldWVbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIE1vdmVzIHRoaXMgcGVyc29uIHRvIHRoZSBMb2NhdGlvbiBzcGVjaWZpZWQsIHVwZGF0aW9uIGFueSBjdXJyZW50IExvY2F0aW9uIGFuZCB0aGUgbmV3IExvY2F0aW9uIG9iamVjdHMgYXMgYXBwcm9wcmlhdGUgKi9cclxuICAgIGdvZXNUbyhsb2NhdGlvbjogTG9jYXRpb24gfCBTY2VuZUlELCBncmlkWDogbnVtYmVyLCBncmlkWTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudExvY2F0aW9uID0gdGhpcy5sb2NhdGlvbjtcclxuICAgICAgICBjb25zdCBuZXdMb2NhdGlvbiA9IGxvY2F0aW9uIGluc3RhbmNlb2YgTG9jYXRpb24gPyBsb2NhdGlvbiA6IFNjZW5lLmJ5SWQobG9jYXRpb24pIGFzIExvY2F0aW9uO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghbmV3TG9jYXRpb24pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIExvY2F0aW9uIG5vdCBwcm92aWRlZCAtIGFyZ3VtZW50IHdhcyAke2xvY2F0aW9ufWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbklkID0gbmV3TG9jYXRpb24uaWQ7XHJcblxyXG4gICAgICAgIGN1cnJlbnRMb2NhdGlvbj8uZ3JpZC5yZW1vdmVUaGluZyh0aGlzKTtcclxuXHJcbiAgICAgICAgbmV3TG9jYXRpb24uZ3JpZC5nZXRTcXVhcmUoZ3JpZFgsIGdyaWRZKT8uYWRkVGhpbmcodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JpZFggPSBncmlkWDtcclxuICAgICAgICB0aGlzLmdyaWRZID0gZ3JpZFk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFJlbmRlck5vZGUgPSB0aGlzLmN1cnJlbnRSZW5kZXJOb2RlSWQ7XHJcbiAgICAgICAgdGhpcy5zbmFwQ3VycmVudFJlbmRlck5vZGVUb0dyaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzbmFwQ3VycmVudFJlbmRlck5vZGVUb0dyaWQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UmVuZGVyTm9kZS5zZXRYKHRoaXMuZ3JpZFggKiAodGhpcy5sb2NhdGlvbj8uZ3JpZFNpemUgPz8gMSkpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFJlbmRlck5vZGUuc2V0WSh0aGlzLmdyaWRZICogKHRoaXMubG9jYXRpb24/LmdyaWRTaXplID8/IDEpKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdyaWRSZW5kZXJTbG90KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIENhbGxpbmcgdGhpcyByZW1vdmVzIHRoaXMgUGVyc29uIGZyb20gdGhlaXIgY3VycmVudCBncmlkLWJhc2VkIFJlbmRlck5vZGUgKGlmIHRoZXkgaGF2ZSBvbmUpLCBhbmQgaW5zZXJ0cyB0aGVtIGludG8gYSBuZXcgb25lIGJhc2VkIG9uIGxvY2F0aW9uIGFuZCBncmlkWSAqL1xyXG4gICAgdXBkYXRlR3JpZFJlbmRlclNsb3QoKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbj8uYWRkUmVuZGVyTm9kZUF0WSh0aGlzLmN1cnJlbnRSZW5kZXJOb2RlLCB0aGlzLmdyaWRZKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQWRkcyBhIFdhaXQgYWN0aW9uIHRvIHRoaXMgUGVyc29uJ3MgcXVldWUgKi9cclxuICAgIHdhaXRzKG1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hZGRBY3Rpb24obmV3IFdhaXQodGhpcywgbWlsbGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGdyaWRZKHk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2dyaWRZID0geTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUdyaWRSZW5kZXJTbG90KCk7XHJcbiAgICAgICAgdGhpcy5zbmFwQ3VycmVudFJlbmRlck5vZGVUb0dyaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ3JpZFkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyaWRZO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBncmlkWCh4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9ncmlkWCA9IHg7XHJcbiAgICAgICAgdGhpcy5zbmFwQ3VycmVudFJlbmRlck5vZGVUb0dyaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ3JpZFgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyaWRYO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBncmlkU3F1YXJlKCk6IE1heWJlPEdyaWRTcXVhcmU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbj8uZ3JpZC5nZXRTcXVhcmUodGhpcy5ncmlkWCwgdGhpcy5ncmlkWSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGUgaGFuZGxlSW5wdXQoaW5wdXQ6IElucHV0RGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjY2VwdGluZ0lucHV0ICYmICghdGhpcy5jdXJyZW50QWN0aW9uIHx8IHRoaXMuY3VycmVudEFjdGlvbi5jb21wbGV0ZSkpIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnVwLmhlbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gXCJ1cFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuV2Fsa1VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxrc1VwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZG93bi5oZWxkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbldhbGtEb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxrc0Rvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5sZWZ0LmhlbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuV2Fsa0xlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGtzTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0LnJpZ2h0LmhlbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbldhbGtSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2Fsa3NSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBRdWV1ZSB1cCBhbiBhY3Rpb24gKi9cclxuICAgIGFkZEFjdGlvbihhY3Rpb246IEFjdGlvbikge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uUXVldWUucHVzaChhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBRdWV1ZSB1cCBhIGxpc3Qgb2YgYWN0aW9ucyAodGhleSB3aWxsIGJlIGluIHRoZSBvcmRlciBwcm92aWRlZCkgKi9cclxuICAgIGFkZEFjdGlvbnMoYWN0aW9uczogQWN0aW9uW10pIHtcclxuICAgICAgICB0aGlzLmFjdGlvblF1ZXVlLmNvbmNhdChhY3Rpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhbGtzKGRpcmVjdGlvbjogV2Fsa0RpcmVjdGlvbiwgc3F1YXJlczogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3F1YXJlczsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQWN0aW9uKG5ldyBXYWxrKHRoaXMsIGRpcmVjdGlvbikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQ2hlY2sgaWYgdGhpcyBQZXJzb24ncyBhY3Rpb24gcXVldWUgaXMgZW1wdHkgKi9cclxuICAgIGdldCBpc0lkbGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uUXVldWUubGVuZ3RoID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHdhbGtzVXAoc3F1YXJlczogbnVtYmVyID0gMSk6IFBlcnNvbiB7XHJcbiAgICAgICAgdGhpcy53YWxrcygndXAnLCBzcXVhcmVzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3YWxrc0Rvd24oc3F1YXJlczogbnVtYmVyID0gMSk6IFBlcnNvbiB7XHJcbiAgICAgICAgdGhpcy53YWxrcygnZG93bicsIHNxdWFyZXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdhbGtzTGVmdChzcXVhcmVzOiBudW1iZXIgPSAxKTogUGVyc29uIHtcclxuICAgICAgICB0aGlzLndhbGtzKCdsZWZ0Jywgc3F1YXJlcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2Fsa3NSaWdodChzcXVhcmVzOiBudW1iZXIgPSAxKTogUGVyc29uIHtcclxuICAgICAgICB0aGlzLndhbGtzKCdyaWdodCcsIHNxdWFyZXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHdhbGtzVG93YXJkcyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHhEaWZmID0gdGhpcy5ncmlkWCAtIHg7XHJcbiAgICAgICAgY29uc3QgeURpZmYgPSB0aGlzLmdyaWRZIC0geTtcclxuICAgICAgICBpZiAoTWF0aC5hYnMoeERpZmYpID4gTWF0aC5hYnMoeURpZmYpKSB7XHJcbiAgICAgICAgICAgIGlmICh4RGlmZiA8IDAgJiYgdGhpcy5jYW5XYWxrUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2Fsa3NSaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4RGlmZiA+IDAgJiYgdGhpcy5jYW5XYWxrTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxrc0xlZnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeURpZmYgPCAwICYmIHRoaXMuY2FuV2Fsa0Rvd24pIHtcclxuICAgICAgICAgICAgdGhpcy53YWxrc0Rvd24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeURpZmYgPiAwICYmIHRoaXMuY2FuV2Fsa1VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Fsa3NVcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbldhbGtUbyh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9uPy5ncmlkLmdldFNxdWFyZSh4LCB5KT8ud2Fsa2FibGUgPz8gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhbldhbGtVcCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW5XYWxrVG8odGhpcy5ncmlkWCwgdGhpcy5ncmlkWSAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYW5XYWxrRG93bigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW5XYWxrVG8odGhpcy5ncmlkWCwgdGhpcy5ncmlkWSArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYW5XYWxrTGVmdCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW5XYWxrVG8odGhpcy5ncmlkWCAtIDEsIHRoaXMuZ3JpZFkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYW5XYWxrUmlnaHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuV2Fsa1RvKHRoaXMuZ3JpZFggKyAxLCB0aGlzLmdyaWRZKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZSB1cGRhdGUoZnJhbWVUaW1lU3RhbXA6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlkZ2V0VGltZShmcmFtZVRpbWVTdGFtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRBY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRBY3Rpb24uaW5Qcm9ncmVzcyAmJiAhdGhpcy5jdXJyZW50QWN0aW9uLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24uc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50QWN0aW9uLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvblF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGggPT09IDApIHsgLy8gR29pbmcgaWRsZS4uLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlkZ2V0VGltZShmcmFtZVRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVuZGVyTm9kZSA9IHRoaXMucmVuZGVyTm9kZXMuc3RhbmRpbmdbdGhpcy5kaXJlY3Rpb25dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoZnJhbWVUaW1lU3RhbXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uLnVwZGF0ZShmcmFtZVRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgeyAvLyBJZGxlXHJcbiAgICAgICAgICAgIGlmIChmcmFtZVRpbWVTdGFtcCA+IHRoaXMubmV4dEZpZGdldFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvbGxvd2luZyAmJiB0aGlzLmxvY2F0aW9uID09PSB0aGlzLmZvbGxvd2luZy5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gZGVmaW5pdGVseSh0aGlzLmxvY2F0aW9uKS5ncmlkLmZpbmRQYXRoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IHRoaXMuZ3JpZFgsIHk6IHRoaXMuZ3JpZFkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiB0aGlzLmZvbGxvd2luZy5ncmlkWCwgeTogdGhpcy5mb2xsb3dpbmcuZ3JpZFkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLmZvckVhY2goKHIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBhcmVUbzogR3JpZFNxdWFyZSA9IHJvdXRlW2luZGV4IC0gMV0gPz8gdGhpcy5ncmlkU3F1YXJlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIueSA+IGNvbXBhcmVUby55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGtzRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIueSA8IGNvbXBhcmVUby55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGtzVXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyLnggPCBjb21wYXJlVG8ueCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxrc0xlZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyLnggPiBjb21wYXJlVG8ueCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxrc1JpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm91dGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29lc1RvKGRlZmluaXRlbHkodGhpcy5mb2xsb3dpbmcubG9jYXRpb24pLCB0aGlzLmZvbGxvd2luZy5ncmlkWCwgdGhpcy5mb2xsb3dpbmcuZ3JpZFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlkZ2V0Tm9kZSA9IHRoaXMucmVuZGVyTm9kZXMuaWRsZTFbdGhpcy5kaXJlY3Rpb25dO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZGdldE5vZGUucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSZW5kZXJOb2RlID0gZmlkZ2V0Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlkZ2V0VGltZShmcmFtZVRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zbmFwQ3VycmVudFJlbmRlck5vZGVUb0dyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIGN1cnJlbnQgUmVuZGVyTm9kZSBhbHdheXMgZ2V0cyBwdXQgaW4gdGhlIExvY2F0aW9uIG9mIHRoaXMgUGVyc29uICovXHJcbiAgICBzZXQgY3VycmVudFJlbmRlck5vZGUobm9kZTogUmVuZGVyTm9kZSB8IFJlbmRlck5vZGVJRCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRSZW5kZXJOb2RlSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVuZGVyTm9kZS5kZXRhY2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBSZW5kZXJOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlbmRlck5vZGVJZCA9IG5vZGUuaWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVuZGVyTm9kZUlkID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbj8uYWRkUmVuZGVyTm9kZUF0WSh0aGlzLmN1cnJlbnRSZW5kZXJOb2RlLCB0aGlzLmdyaWRZKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3VycmVudFJlbmRlck5vZGUoKTogUmVuZGVyTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIGRlZmluaXRlbHkoUmVuZGVyTm9kZS5ieUlkKHRoaXMuY3VycmVudFJlbmRlck5vZGVJZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRlbGwgdGhpcyBwZXJzb24gdG8ga2VlcCB3YWxraW5nIGFmdGVyIGFub3RoZXIgcGVyc29uXHJcbiAgICBmb2xsb3dzKG90aGVyUGVyc29uOiBQZXJzb24pIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IG90aGVyUGVyc29uO1xyXG4gICAgICAgIG90aGVyUGVyc29uLmZvbGxvd2VkQnkgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BzRm9sbG93aW5nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvbGxvd2luZz8uZm9sbG93ZWRCeSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvbGxvd2luZy5mb2xsb3dlZEJ5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSXMgdGhpcyBwZXJzb24gb25lIHNxdWFyZSB1cCwgZG93biwgbGVmdCBvciByaWdodCBvZiB0aGUgb3RoZXIgcGVyc29uICovXHJcbiAgICBpc05leHRUbyhvdGhlclBlcnNvbjogUGVyc29uKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jYXRpb24gIT09IG90aGVyUGVyc29uLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgeERpZmYgPSBNYXRoLmFicyh0aGlzLmdyaWRYIC0gb3RoZXJQZXJzb24uZ3JpZFgpO1xyXG4gICAgICAgIGlmICh4RGlmZiA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB5RGlmZiA9IE1hdGguYWJzKHRoaXMuZ3JpZFkgLSBvdGhlclBlcnNvbi5ncmlkWSk7XHJcbiAgICAgICAgaWYgKHlEaWZmID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4RGlmZiA9PT0gMSAmJiB5RGlmZiA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59Il19