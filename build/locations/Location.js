"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const import_manager_js_1 = require("../import-manager.js");
const import_manager_js_2 = require("../import-manager.js");
const import_manager_js_3 = require("../import-manager.js");
const ElectronicaGame_1 = require("../ElectronicaGame");
const GRIDSIZE = 16;
/** An implementation of the Scene class for managing game locations */
class Location extends import_manager_js_1.Scene {
    constructor(w, h, backgroundKey, grid) {
        super({ w, h });
        this.backgroundKey = backgroundKey;
        this.gridId = grid.id;
        this.addRenderNode(new import_manager_js_2.ImageNode({
            imageName: backgroundKey,
            x: 0,
            y: 0,
            scene: this.id,
        }));
        this.yIndexedLayers = [];
        for (let gridY = 0; gridY < this.grid.height; gridY += 1) {
            this.yIndexedLayers.push(this.addRenderNode(new import_manager_js_2.RenderNode({
                x: 0,
                xUnit: import_manager_js_2.Units.px,
                xRelativeTo: import_manager_js_2.RelativeTo.scene,
                y: gridY * GRIDSIZE,
                yUnit: import_manager_js_2.Units.px,
                yRelativeTo: import_manager_js_2.RelativeTo.parent,
                scene: this.id,
            })));
        }
    }
    get grid() {
        const g = import_manager_js_3.Grid.byId(this.gridId);
        if (!g) {
            throw new Error('This Location does not have a Grid. Why?');
        }
        return g;
    }
    set grid(grid) {
        this.gridId = grid.id;
    }
    get gridSize() {
        return GRIDSIZE;
    }
    /** Add an ImageNode snapped to the appropriate X and Y positions for it to */
    addGridImage(gridX, gridY, imageName) {
        const imageNode = new import_manager_js_2.ImageNode({ imageName });
        const img = ElectronicaGame_1.gameData.images.byKey[imageName];
        const rowNode = this.yIndexedLayers[gridY];
        rowNode.addChild(imageNode);
        imageNode.setX(gridX * GRIDSIZE, import_manager_js_2.Units.px, import_manager_js_2.RelativeTo.parent);
        imageNode.setY((img.height - GRIDSIZE) * -1, import_manager_js_2.Units.px, import_manager_js_2.RelativeTo.parent);
    }
    addGridAnimation(gridX, gridY, animation) {
        const rowNode = this.yIndexedLayers[gridY];
        rowNode.addChild(animation);
        animation.setX(gridX * GRIDSIZE, import_manager_js_2.Units.px, import_manager_js_2.RelativeTo.parent);
        animation.setY((animation.h - GRIDSIZE) * -1, import_manager_js_2.Units.px, import_manager_js_2.RelativeTo.parent);
    }
}
exports.Location = Location;
//# sourceMappingURL=Location.js.map