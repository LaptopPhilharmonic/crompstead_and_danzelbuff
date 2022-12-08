import { Maybe } from '../util/typescript-helpers.js';
import { ThingID, Thing } from '../import-manager.js';
export declare class GridId {
    number: number;
    constructor();
}
export interface Coordinates {
    x: number;
    y: number;
}
export declare class GridSquare {
    private gridId;
    x: number;
    y: number;
    walkable: boolean;
    interactionKey: string;
    walkoverKey: string;
    /** The absolute reference number for this square - (y * width) + x */
    refNumber: number;
    private thingIds;
    constructor(grid: Grid, x: number, y: number, walkable: boolean);
    get parentGrid(): Grid;
    get isInteractable(): boolean;
    get hasWalkover(): boolean;
    get things(): Thing[];
    get coordinates(): Coordinates;
    /** Add a Thing to this square (if it isn't there already) */
    addThing(thing: Thing | ThingID): void;
    /** Remove a Thing from this square if it's there */
    removeThing(thing: Thing | ThingID): void;
    /** Get another square in this grid relative to this square. Negative numbers for up and left, positive for down and right */
    getRelativeNeighbour(relativeX: number, relativeY: number): Maybe<GridSquare>;
    getNeighbourAbove(): Maybe<GridSquare>;
    getNeighbourToRight(): Maybe<GridSquare>;
    getNeighbourBelow(): Maybe<GridSquare>;
    getNeighbourToLeft(): Maybe<GridSquare>;
    getAllNeighbours(): GridSquare[];
}
export declare class Grid {
    id: GridId;
    width: number;
    height: number;
    squares: {
        [key: string]: GridSquare;
    };
    private squaresArray;
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
    /** Remove a thing from all squares in this grid */
    removeThing(thing: Thing | ThingID): void;
    /** Use an algorithm to find a path from the first square to the second. Returns an empty array if it fails */
    findPath(from: Coordinates, to: Coordinates): GridSquare[];
    static byId(id: GridId): Maybe<Grid>;
}
