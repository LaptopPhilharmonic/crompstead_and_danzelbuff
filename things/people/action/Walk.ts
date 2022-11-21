import { Action, Person, gameData } from '../../../import-manager.js';

export type WalkDirection = 'up' | 'down' | 'left' | 'right';

export interface WalkData {
    /** The person doing the walking */
    person: Person;
    /** The direction the person is walking in */
    direction: WalkDirection;
    /** How long this one square walk should last in milliseconds. Default 300 */
    duration: number;
}

export class Walk extends Action {
    private person: Person;
    private direction: WalkDirection;
    private duration: number;
    private fromSquare: {x: number, y: number}
    private toSquare: {x: number, y: number}
    private fromPx: {x: number, y: number}
    private toPx: {x: number, y: number}
    private xChange: number;
    private yChange: number;

    constructor(person: Person, direction: WalkDirection, duration: number = 200) {
        super();
        this.person = person;
        this.direction = direction;
        this.duration = duration;
        this.fromSquare = {
            x: this.person.gridX,
            y: this.person.gridY,
        }
        let toX: number | undefined = undefined;
        let toY: number | undefined = undefined;
        switch (direction) {
            case 'up':
                toY = this.fromSquare.y - 1;
                break;
            case 'down':
                toY = this.fromSquare.y + 1;
                break;
            case 'left':
                toX = this.fromSquare.x - 1;
                break;
            case 'right':
                toX = this.fromSquare.x + 1;
        }
        this.toSquare = {
            x: toX ? toX : this.person.gridX,
            y: toY ? toY : this.person.gridY,
        }

        // Location should really exist but you never know
        const gridSize = this.person?.location?.gridSize ?? 1;

        // We need to lop a pixel off the distance in the direction travelled to stop jerky walking if the key stays held in
        let xReduction = 0;
        if (direction === 'left') {
            xReduction = -1;
        } else if (direction === 'right') {
            xReduction = 1;
        }

        let yReduction = 0;
        if (direction === 'up') {
            yReduction = -1
        } else if (direction === 'down') {
            yReduction = 1;
        }

        // Used to smooth walking motion when holding down key for multiple squares
        const frameFactor = gridSize / (this.duration / gameData.frameLengthMillis);

        this.xChange = (gridSize * xReduction) - xReduction * frameFactor;
        this.yChange = (gridSize * yReduction) - yReduction * frameFactor;
        this.fromPx = {
            x: (this.fromSquare.x * gridSize) + xReduction * frameFactor,
            y: (this.fromSquare.y * gridSize) + yReduction * frameFactor,
        };
        this.toPx = {
            x: this.toSquare.x * gridSize,
            y: this.toSquare.y * gridSize,
        };
    }

    start() {
        super.start();
        const renderNode = this.person.renderNodes.walking[this.direction];
        renderNode.setX(this.fromPx.x);
        renderNode.setY(this.fromPx.y);
        this.person.currentRenderNode = renderNode;
    }

    update(frameTimeStamp: number) {
        const amountComplete = (frameTimeStamp - this.startTime) / this.duration;
        if (amountComplete < 1) {
            this.person.currentRenderNode.setX(this.fromPx.x + Math.round(this.xChange * amountComplete));
            this.person.currentRenderNode.setY(this.fromPx.y + Math.round(this.yChange * amountComplete));
        } else {
            this.person.gridX = this.toSquare.x;
            this.person.gridY = this.toSquare.y;
            this.person.snapCurrentRenderNodeToGrid();
            this.finish();
        }
    }
}