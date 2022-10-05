import { Scene } from '../import-manager.js';
import { ImageNode, AnimationNode, RenderNode, Units, RelativeTo } from '../import-manager.js';
import { Grid, GridId } from '../import-manager.js';
import { gameData } from '../ElectronicaGame';

const GRIDSIZE = 16;

/** An implementation of the Scene class for managing game locations */
export class Location extends Scene {
    /** The key of the background image for this location */
    backgroundKey: string;
    /** The ID of the grid for this location */
    private gridId: GridId;
    /** The top-level RenderNodes used to manage what's in front of what */
    yIndexedLayers: RenderNode[];
    
    constructor(w: number, h: number, backgroundKey: string, grid: Grid) {
        super({w, h});
        this.backgroundKey = backgroundKey;
        this.gridId = grid.id;
        this.addRenderNode(new ImageNode({
            imageName: backgroundKey,
            x: 0,
            y: 0,
            scene: this.id,
        }));

        this.yIndexedLayers = [];
        for (let gridY = 0; gridY < this.grid.height; gridY += 1) {
            this.yIndexedLayers.push(this.addRenderNode(new RenderNode({
                x: 0,
                xUnit: Units.px,
                xRelativeTo: RelativeTo.scene,
                y: gridY * GRIDSIZE,
                yUnit: Units.px,
                yRelativeTo: RelativeTo.parent,
                scene: this.id,
            })));
        }
    }

    get grid(): Grid {
        const g = Grid.byId(this.gridId);
        if (!g) {
            throw new Error('This Location does not have a Grid. Why?');
        }
        return g;
    }

    set grid(grid: Grid) {
        this.gridId = grid.id;
    }

    get gridSize(): number {
        return GRIDSIZE;
    }

    /** Add an ImageNode snapped to the appropriate X and Y positions for it to */
    addGridImage(gridX: number, gridY: number, imageName: string) {
        const imageNode = new ImageNode({imageName});
        const img = gameData.images.byKey[imageName];
        const rowNode = this.yIndexedLayers[gridY];
        rowNode.addChild(imageNode);
        imageNode.setX(gridX * GRIDSIZE, Units.px, RelativeTo.parent);
        imageNode.setY((img.height - GRIDSIZE) * -1, Units.px, RelativeTo.parent);
    }

    addGridAnimation(gridX: number, gridY: number, animation: AnimationNode) {
        const rowNode = this.yIndexedLayers[gridY];
        rowNode.addChild(animation);
        animation.setX(gridX * GRIDSIZE, Units.px, RelativeTo.parent);
        animation.setY((animation.h - GRIDSIZE) * -1, Units.px, RelativeTo.parent);
    }
}