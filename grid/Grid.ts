import { Maybe, filterDefinitely } from '../util/typescript-helpers.js';
import { ThingID, Thing } from '../import-manager.js';

/** For managing data for grid-based game logic */

let nextGridId = 1;
const allGrids: {[key: number]: Grid} = {};

export class GridId {
    number: number;

    constructor() {
        this.number = nextGridId;
        nextGridId += 1;
    }
}

export class GridSquare {
    private gridId: GridId;
    x: number;
    y: number;
    walkable: boolean;
    interactionKey: string;
    walkoverKey: string;
    private thingIds: ThingID[] = [];

    constructor(grid: Grid, x: number, y: number, walkable: boolean) {
        this.gridId = grid.id;
        this.x = x;
        this.y = y;
        this.walkable = walkable;
        this.interactionKey = '';
        this.walkoverKey = '';
    }

    get parentGrid(): Grid {
        const parent = Grid.byId(this.gridId);
        if (!parent) {
            throw new Error('No parent Grid found for this GridSquare. How can this happen?');
        }
        return parent;
    }

    get isInteractable(): boolean {
        return this.interactionKey !== '';
    }

    get hasWalkover(): boolean {
        return this.walkoverKey !== '';
    }

    get things(): Thing[] {
        return filterDefinitely(this.thingIds.map((id) => Thing.byId(id)));
    }

    /** Add a Thing to this square (if it isn't there already) */
    addThing(thing: Thing | ThingID) {
        const id = thing instanceof Thing ? thing.id : thing;
        if (!this.thingIds.includes(id)) {
            this.thingIds.push(id);
        }
    }

    /** Remove a Thing from this square if it's there */
    removeThing(thing: Thing | ThingID) {
        const id = thing instanceof Thing ? thing.id : thing;
        const thingIndex = this.thingIds.indexOf(id);
        if (thingIndex > -1) {
            this.thingIds.splice(thingIndex, 1);
        }
    }

    /** Get another square in this grid relative to this square. Negative numbers for up and left, positive for down and right */
    getRelativeNeighbour(relativeX: number, relativeY: number): Maybe<GridSquare> {
        return this.parentGrid.getSquare(this.x + relativeX, this.y + relativeY);
    }

    getNeighbourAbove(): Maybe<GridSquare> {
        return this.getRelativeNeighbour(0, -1);
    }

    getNeighbourToRight(): Maybe<GridSquare> {
        return this.getRelativeNeighbour(1, 0);
    }

    getNeighbourBelow(): Maybe<GridSquare> {
        return this.getRelativeNeighbour(1, 0);
    }

    getNeighbourToLeft(): Maybe<GridSquare> {
        return this.getRelativeNeighbour(0, -1);
    }
}

export class Grid {
    id: GridId;
    width: number;
    height: number;
    squares: {[key: string]: GridSquare};
    private squaresArray: GridSquare[] = [];

    /** Pass it an array of strings like this: 
     * 'XXX'
     * 'X-X'
     * 'XXX'
     * For quick auto-population of no-go squares
     * 
     * X = No-go
     * - = Walkable
     * 
     * Grid slots can contain an interactive element which you can supply as you like, and
     * you can edit the walkability of individual squares later on
    */
    constructor(basicLayout: string[]) {
        if (basicLayout.length === 0 || !basicLayout.every((row) => row.length === basicLayout[0].length)) {
            throw new Error('The grid should have at least one row, and all rows should be of the same length');
        }

        this.id = new GridId();
        this.width = basicLayout[0].length;
        this.height = basicLayout.length;
        this.squares = {};

        basicLayout.forEach((row, rowIndex) => {
            row.split('').forEach((column, columnIndex) => {
                const square = new GridSquare(this, columnIndex, rowIndex, column.toUpperCase() !== 'X');
                this.squares[`${columnIndex}-${rowIndex}`] = square;
                this.squaresArray.push(square);
            });
        });

        allGrids[this.id.number] = this;
    }

    getSquare(x: number, y: number): Maybe<GridSquare> {
        return this.squares[`${x}-${y}`];
    }

    /** Remove a thing from all squares in this grid */
    removeThing(thing: Thing | ThingID) {
        this.squaresArray.forEach((square) => square.removeThing(thing));
    }

    static byId(id: GridId): Maybe<Grid> {
        return allGrids[id.number];
    }
}