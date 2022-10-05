import { Maybe } from '../util/typescript-helpers.js';
export declare class GridId {
    number: number;
    constructor();
}
export declare class GridSquare {
    private gridId;
    x: number;
    y: number;
    walkable: boolean;
    interactionKey: string;
    walkoverKey: string;
    constructor(grid: Grid, x: number, y: number, walkable: boolean);
    get parentGrid(): Grid;
    get isInteractable(): boolean;
    get hasWalkover(): boolean;
    /** Get another square in this grid relative to this square. Negative numbers for up and left, positive for down and right */
    getRelativeNeighbour(relativeX: number, relativeY: number): Maybe<GridSquare>;
    getNeighbourAbove(): Maybe<GridSquare>;
    getNeighbourToRight(): Maybe<GridSquare>;
    getNeighbourBelow(): Maybe<GridSquare>;
    getNeighbourToLeft(): Maybe<GridSquare>;
}
export declare class Grid {
    id: GridId;
    width: number;
    height: number;
    squares: {
        [key: string]: GridSquare;
    };
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
    constructor(basicLayout: string[]);
    getSquare(x: number, y: number): Maybe<GridSquare>;
    static byId(id: GridId): Maybe<Grid>;
}
