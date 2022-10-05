"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = exports.GridSquare = exports.GridId = void 0;
/** For managing data for grid-based game logic */
let nextGridId = 1;
const allGrids = {};
class GridId {
    constructor() {
        this.number = nextGridId;
        nextGridId += 1;
    }
}
exports.GridId = GridId;
class GridSquare {
    constructor(grid, x, y, walkable) {
        this.gridId = grid.id;
        this.x = x;
        this.y = y;
        this.walkable = walkable;
        this.interactionKey = '';
        this.walkoverKey = '';
    }
    get parentGrid() {
        const parent = Grid.byId(this.gridId);
        if (!parent) {
            throw new Error('No parent Grid found for this GridSquare. How can this happen?');
        }
        return parent;
    }
    get isInteractable() {
        return this.interactionKey !== '';
    }
    get hasWalkover() {
        return this.walkoverKey !== '';
    }
    /** Get another square in this grid relative to this square. Negative numbers for up and left, positive for down and right */
    getRelativeNeighbour(relativeX, relativeY) {
        return this.parentGrid.getSquare(this.x + relativeX, this.y + relativeY);
    }
    getNeighbourAbove() {
        return this.getRelativeNeighbour(0, -1);
    }
    getNeighbourToRight() {
        return this.getRelativeNeighbour(1, 0);
    }
    getNeighbourBelow() {
        return this.getRelativeNeighbour(1, 0);
    }
    getNeighbourToLeft() {
        return this.getRelativeNeighbour(0, -1);
    }
}
exports.GridSquare = GridSquare;
class Grid {
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
    constructor(basicLayout) {
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
    getSquare(x, y) {
        return this.squares[`${x}-${y}`];
    }
    static byId(id) {
        return allGrids[id.number];
    }
}
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map