import { Maybe } from '../util/typescript-helpers.js';

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
                this.squares[`${columnIndex}-${rowIndex}`] = new GridSquare(this, columnIndex, rowIndex, column.toUpperCase() === 'X');
            });
        });

        allGrids[this.id.number] = this;
    }

    getSquare(x: number, y: number): Maybe<GridSquare> {
        return this.squares[`${x}-${y}`];
    }

    static byId(id: GridId): Maybe<Grid> {
        return allGrids[id.number];
    }
}