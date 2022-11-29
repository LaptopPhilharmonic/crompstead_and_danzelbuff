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
    addRenderNodeAtY(node, yValue) {
        this.yIndexedLayers[yValue].addChild(node);
    }
    removeYIndexedRenderNode(node) {
        const nodeId = node instanceof import_manager_js_2.RenderNodeID ? node : node.id;
        const yIndexed = this.yIndexedLayers.find((layer) => layer.children.includes(nodeId));
        yIndexed === null || yIndexed === void 0 ? void 0 : yIndexed.removeChild(node);
    }
}
exports.Location = Location;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9sb2NhdGlvbnMvTG9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQTZDO0FBQzdDLDREQUE2RztBQUM3Ryw0REFBb0Q7QUFDcEQsd0RBQThDO0FBRTlDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQix1RUFBdUU7QUFDdkUsTUFBYSxRQUFTLFNBQVEseUJBQUs7SUFRL0IsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLGFBQXFCLEVBQUUsSUFBVTtRQUMvRCxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksNkJBQVMsQ0FBQztZQUM3QixTQUFTLEVBQUUsYUFBYTtZQUN4QixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLDhCQUFVLENBQUM7Z0JBQ3ZELENBQUMsRUFBRSxDQUFDO2dCQUNKLEtBQUssRUFBRSx5QkFBSyxDQUFDLEVBQUU7Z0JBQ2YsV0FBVyxFQUFFLDhCQUFVLENBQUMsS0FBSztnQkFDN0IsQ0FBQyxFQUFFLEtBQUssR0FBRyxRQUFRO2dCQUNu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U2NlbmUgfSBmcm9tICcuLi9pbXBvcnQtbWFuYWdlci5qcyc7XHJcbmltcG9ydCB7IEltYWdlTm9kZSwgQW5pbWF0aW9uTm9kZSwgUmVuZGVyTm9kZSwgUmVuZGVyTm9kZUlELCBVbml0cywgUmVsYXRpdmVUbyB9IGZyb20gJy4uL2ltcG9ydC1tYW5hZ2VyLmpzJztcclxuaW1wb3J0IHsgR3JpZCwgR3JpZElkIH0gZnJvbSAnLi4vaW1wb3J0LW1hbmFnZXIuanMnO1xyXG5pbXBvcnQgeyBnYW1lRGF0YSB9IGZyb20gJy4uL0VsZWN0cm9uaWNhR2FtZSc7XHJcblxyXG5jb25zdCBHUklEU0laRSA9IDE2O1xyXG5cclxuLyoqIEFuIGltcGxlbWVudGF0aW9uIG9mIHRoZSBTY2VuZSBjbGFzcyBmb3IgbWFuYWdpbmcgZ2FtZSBsb2NhdGlvbnMgKi9cclxuZXhwb3J0IGNsYXNzIExvY2F0aW9uIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgLyoqIFRoZSBrZXkgb2YgdGhlIGJhY2tncm91bmQgaW1hZ2UgZm9yIHRoaXMgbG9jYXRpb24gKi9cclxuICAgIGJhY2tncm91bmRLZXk6IHN0cmluZztcclxuICAgIC8qKiBUaGUgSUQgb2YgdGhlIGdyaWQgZm9yIHRoaXMgbG9jYXRpb24gKi9cclxuICAgIHByaXZhdGUgZ3JpZElkOiBHcmlkSWQ7XHJcbiAgICAvKiogVGhlIHRvcC1sZXZlbCBSZW5kZXJOb2RlcyB1c2VkIHRvIG1hbmFnZSB3aGF0J3MgaW4gZnJvbnQgb2Ygd2hhdCAqL1xyXG4gICAgeUluZGV4ZWRMYXllcnM6IFJlbmRlck5vZGVbXTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IodzogbnVtYmVyLCBoOiBudW1iZXIsIGJhY2tncm91bmRLZXk6IHN0cmluZywgZ3JpZDogR3JpZCkge1xyXG4gICAgICAgIHN1cGVyKHt3LCBofSk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kS2V5ID0gYmFja2dyb3VuZEtleTtcclxuICAgICAgICB0aGlzLmdyaWRJZCA9IGdyaWQuaWQ7XHJcbiAgICAgICAgdGhpcy5hZGRSZW5kZXJOb2RlKG5ldyBJbWFnZU5vZGUoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6IGJhY2tncm91bmRLZXksXHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgIHNjZW5lOiB0aGlzLmlkLFxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy55SW5kZXhlZExheWVycyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGdyaWRZID0gMDsgZ3JpZFkgPCB0aGlzLmdyaWQuaGVpZ2h0OyBncmlkWSArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMueUluZGV4ZWRMYXllcnMucHVzaCh0aGlzLmFkZFJlbmRlck5vZGUobmV3IFJlbmRlck5vZGUoe1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHhVbml0OiBVbml0cy5weCxcclxuICAgICAgICAgICAgICAgIHhSZWxhdGl2ZVRvOiBSZWxhdGl2ZVRvLnNjZW5lLFxyXG4gICAgICAgICAgICAgICAgeTogZ3JpZFkgKiBHUklEU0laRSxcclxuICAgICAgICAgICAgICAgIHlVbml0OiBVbml0cy5weCxcclxuICAgICAgICAgICAgICAgIHlSZWxhdGl2ZVRvOiBSZWxhdGl2ZVRvLnBhcmVudCxcclxuICAgICAgICAgICAgICAgIHNjZW5lOiB0aGlzLmlkLFxyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ3JpZCgpOiBHcmlkIHtcclxuICAgICAgICBjb25zdCBnID0gR3JpZC5ieUlkKHRoaXMuZ3JpZElkKTtcclxuICAgICAgICBpZiAoIWcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIExvY2F0aW9uIGRvZXMgbm90IGhhdmUgYSBHcmlkLiBXaHk/Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBncmlkKGdyaWQ6IEdyaWQpIHtcclxuICAgICAgICB0aGlzLmdyaWRJZCA9IGdyaWQuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdyaWRTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIEdSSURTSVpFO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBBZGQgYW4gSW1hZ2VOb2RlIHNuYXBwZWQgdG8gdGhlIGFwcHJvcHJpYXRlIFggYW5kIFkgcG9zaXRpb25zIGZvciBpdCB0byAqL1xyXG4gICAgYWRkR3JpZEltYWdlKGdyaWRYOiBudW1iZXIsIGdyaWRZOiBudW1iZXIsIGltYWdlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VOb2RlID0gbmV3IEltYWdlTm9kZSh7aW1hZ2VOYW1lfSk7XHJcbiAgICAgICAgY29uc3QgaW1nID0gZ2FtZURhdGEuaW1hZ2VzLmJ5S2V5W2ltYWdlTmFtZV07XHJcbiAgICAgICAgY29uc3Qgcm93Tm9kZSA9IHRoaXMueUluZGV4ZWRMYXllcnNbZ3JpZFldO1xyXG4gICAgICAgIHJvd05vZGUuYWRkQ2hpbGQoaW1hZ2VOb2RlKTtcclxuICAgICAgICBpbWFnZU5vZGUuc2V0WChncmlkWCAqIEdSSURTSVpFLCBVbml0cy5weCwgUmVsYXRpdmVUby5wYXJlbnQpO1xyXG4gICAgICAgIGltYWdlTm9kZS5zZXRZKChpbWcuaGVpZ2h0IC0gR1JJRFNJWkUpICogLTEsIFVuaXRzLnB4LCBSZWxhdGl2ZVRvLnBhcmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkR3JpZEFuaW1hdGlvbihncmlkWDogbnVtYmVyLCBncmlkWTogbnVtYmVyLCBhbmltYXRpb246IEFuaW1hdGlvbk5vZGUpIHtcclxuICAgICAgICBjb25zdCByb3dOb2RlID0gdGhpcy55SW5kZXhlZExheWVyc1tncmlkWV07XHJcbiAgICAgICAgcm93Tm9kZS5hZGRDaGlsZChhbmltYXRpb24pO1xyXG4gICAgICAgIGFuaW1hdGlvbi5zZXRYKGdyaWRYICogR1JJRFNJWkUsIFVuaXRzLnB4LCBSZWxhdGl2ZVRvLnBhcmVudCk7XHJcbiAgICAgICAgYW5pbWF0aW9uLnNldFkoKGFuaW1hdGlvbi5oIC0gR1JJRFNJWkUpICogLTEsIFVuaXRzLnB4LCBSZWxhdGl2ZVRvLnBhcmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUmVuZGVyTm9kZUF0WShub2RlOiBSZW5kZXJOb2RlLCB5VmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueUluZGV4ZWRMYXllcnNbeVZhbHVlXS5hZGRDaGlsZChub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVZSW5kZXhlZFJlbmRlck5vZGUobm9kZTogUmVuZGVyTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGVJZCA9IG5vZGUgaW5zdGFuY2VvZiBSZW5kZXJOb2RlSUQgPyBub2RlIDogbm9kZS5pZDtcclxuICAgICAgICBjb25zdCB5SW5kZXhlZCA9IHRoaXMueUluZGV4ZWRMYXllcnMuZmluZCgobGF5ZXIpID0+IGxheWVyLmNoaWxkcmVuLmluY2x1ZGVzKG5vZGVJZCkpO1xyXG4gICAgICAgIHlJbmRleGVkPy5yZW1vdmVDaGlsZChub2RlKTtcclxuICAgIH1cclxufSJdfQ==