"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Walk = void 0;
const import_manager_js_1 = require("../../../import-manager.js");
class Walk extends import_manager_js_1.Action {
    constructor(person, direction, duration = 200) {
        var _a, _b, _c;
        super();
        this.person = person;
        this.direction = direction;
        this.duration = duration;
        this.fromSquare = {
            x: this.person.gridX,
            y: this.person.gridY,
        };
        let toX = undefined;
        let toY = undefined;
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
        };
        // Location should really exist but you never know
        const gridSize = (_c = (_b = (_a = this.person) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.gridSize) !== null && _c !== void 0 ? _c : 1;
        // We need to lop a pixel off the distance in the direction travelled to stop jerky walking if the key stays held in
        let xReduction = 0;
        if (direction === 'left') {
            xReduction = -1;
        }
        else if (direction === 'right') {
            xReduction = 1;
        }
        let yReduction = 0;
        if (direction === 'up') {
            yReduction = -1;
        }
        else if (direction === 'down') {
            yReduction = 1;
        }
        // Used to smooth walking motion when holding down key for multiple squares
        const frameFactor = gridSize / (this.duration / import_manager_js_1.gameData.frameLengthMillis);
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
        this.person.gridX = this.toSquare.x;
        this.person.gridY = this.toSquare.y;
    }
    update(frameTimeStamp) {
        const amountComplete = (frameTimeStamp - this.startTime) / this.duration;
        if (amountComplete < 1) {
            this.person.currentRenderNode.setX(this.fromPx.x + Math.round(this.xChange * amountComplete));
            this.person.currentRenderNode.setY(this.fromPx.y + Math.round(this.yChange * amountComplete));
        }
        else {
            this.person.snapCurrentRenderNodeToGrid();
            this.finish();
        }
    }
}
exports.Walk = Walk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2Fsay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RoaW5ncy9wZW9wbGUvYWN0aW9uL1dhbGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0VBQXNFO0FBYXRFLE1BQWEsSUFBSyxTQUFRLDBCQUFNO0lBVzVCLFlBQVksTUFBYyxFQUFFLFNBQXdCLEVBQUUsV0FBbUIsR0FBRzs7UUFDeEUsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2QsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQ3ZCLENBQUE7UUFDRCxJQUFJLEdBQUcsR0FBdUIsU0FBUyxDQUFDO1FBQ3hDLElBQUksR0FBRyxHQUF1QixTQUFTLENBQUM7UUFDeEMsUUFBUSxTQUFTLEVBQUU7WUFDZixLQUFLLElBQUk7Z0JBQ0wsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLE1BQU07WUFDVixLQUFLLE9BQU87Z0JBQ1IsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixDQUFD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SUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1NBQ2pHO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztDQUNKO0FBN0ZELG9CQTZGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiwgUGVyc29uLCBnYW1lRGF0YSB9IGZyb20gJy4uLy4uLy4uL2ltcG9ydC1tYW5hZ2VyLmpzJztcclxuXHJcbmV4cG9ydCB0eXBlIFdhbGtEaXJlY3Rpb24gPSAndXAnIHwgJ2Rvd24nIHwgJ2xlZnQnIHwgJ3JpZ2h0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2Fsa0RhdGEge1xyXG4gICAgLyoqIFRoZSBwZXJzb24gZG9pbmcgdGhlIHdhbGtpbmcgKi9cclxuICAgIHBlcnNvbjogUGVyc29uO1xyXG4gICAgLyoqIFRoZSBkaXJlY3Rpb24gdGhlIHBlcnNvbiBpcyB3YWxraW5nIGluICovXHJcbiAgICBkaXJlY3Rpb246IFdhbGtEaXJlY3Rpb247XHJcbiAgICAvKiogSG93IGxvbmcgdGhpcyBvbmUgc3F1YXJlIHdhbGsgc2hvdWxkIGxhc3QgaW4gbWlsbGlzZWNvbmRzLiBEZWZhdWx0IDMwMCAqL1xyXG4gICAgZHVyYXRpb246IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhbGsgZXh0ZW5kcyBBY3Rpb24ge1xyXG4gICAgcHJpdmF0ZSBwZXJzb246IFBlcnNvbjtcclxuICAgIHByaXZhdGUgZGlyZWN0aW9uOiBXYWxrRGlyZWN0aW9uO1xyXG4gICAgcHJpdmF0ZSBkdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmcm9tU3F1YXJlOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9XHJcbiAgICBwcml2YXRlIHRvU3F1YXJlOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9XHJcbiAgICBwcml2YXRlIGZyb21QeDoge3g6IG51bWJlciwgeTogbnVtYmVyfVxyXG4gICAgcHJpdmF0ZSB0b1B4OiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9XHJcbiAgICBwcml2YXRlIHhDaGFuZ2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgeUNoYW5nZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBlcnNvbjogUGVyc29uLCBkaXJlY3Rpb246IFdhbGtEaXJlY3Rpb24sIGR1cmF0aW9uOiBudW1iZXIgPSAyMDApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucGVyc29uID0gcGVyc29uO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB0aGlzLmZyb21TcXVhcmUgPSB7XHJcbiAgICAgICAgICAgIHg6IHRoaXMucGVyc29uLmdyaWRYLFxyXG4gICAgICAgICAgICB5OiB0aGlzLnBlcnNvbi5ncmlkWSxcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvWDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCB0b1k6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgICAgICAgICB0b1kgPSB0aGlzLmZyb21TcXVhcmUueSAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICAgICAgICB0b1kgPSB0aGlzLmZyb21TcXVhcmUueSArIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICB0b1ggPSB0aGlzLmZyb21TcXVhcmUueCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgdG9YID0gdGhpcy5mcm9tU3F1YXJlLnggKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRvU3F1YXJlID0ge1xyXG4gICAgICAgICAgICB4OiB0b1ggPyB0b1ggOiB0aGlzLnBlcnNvbi5ncmlkWCxcclxuICAgICAgICAgICAgeTogdG9ZID8gdG9ZIDogdGhpcy5wZXJzb24uZ3JpZFksXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMb2NhdGlvbiBzaG91bGQgcmVhbGx5IGV4aXN0IGJ1dCB5b3UgbmV2ZXIga25vd1xyXG4gICAgICAgIGNvbnN0IGdyaWRTaXplID0gdGhpcy5wZXJzb24/LmxvY2F0aW9uPy5ncmlkU2l6ZSA/PyAxO1xyXG5cclxuICAgICAgICAvLyBXZSBuZWVkIHRvIGxvcCBhIHBpeGVsIG9mZiB0aGUgZGlzdGFuY2UgaW4gdGhlIGRpcmVjdGlvbiB0cmF2ZWxsZWQgdG8gc3RvcCBqZXJreSB3YWxraW5nIGlmIHRoZSBrZXkgc3RheXMgaGVsZCBpblxyXG4gICAgICAgIGxldCB4UmVkdWN0aW9uID0gMDtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgeFJlZHVjdGlvbiA9IC0xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHhSZWR1Y3Rpb24gPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHlSZWR1Y3Rpb24gPSAwO1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd1cCcpIHtcclxuICAgICAgICAgICAgeVJlZHVjdGlvbiA9IC0xXHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xyXG4gICAgICAgICAgICB5UmVkdWN0aW9uID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVzZWQgdG8gc21vb3RoIHdhbGtpbmcgbW90aW9uIHdoZW4gaG9sZGluZyBkb3duIGtleSBmb3IgbXVsdGlwbGUgc3F1YXJlc1xyXG4gICAgICAgIGNvbnN0IGZyYW1lRmFjdG9yID0gZ3JpZFNpemUgLyAodGhpcy5kdXJhdGlvbiAvIGdhbWVEYXRhLmZyYW1lTGVuZ3RoTWlsbGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy54Q2hhbmdlID0gKGdyaWRTaXplICogeFJlZHVjdGlvbikgLSB4UmVkdWN0aW9uICogZnJhbWVGYWN0b3I7XHJcbiAgICAgICAgdGhpcy55Q2hhbmdlID0gKGdyaWRTaXplICogeVJlZHVjdGlvbikgLSB5UmVkdWN0aW9uICogZnJhbWVGYWN0b3I7XHJcbiAgICAgICAgdGhpcy5mcm9tUHggPSB7XHJcbiAgICAgICAgICAgIHg6ICh0aGlzLmZyb21TcXVhcmUueCAqIGdyaWRTaXplKSArIHhSZWR1Y3Rpb24gKiBmcmFtZUZhY3RvcixcclxuICAgICAgICAgICAgeTogKHRoaXMuZnJvbVNxdWFyZS55ICogZ3JpZFNpemUpICsgeVJlZHVjdGlvbiAqIGZyYW1lRmFjdG9yLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50b1B4ID0ge1xyXG4gICAgICAgICAgICB4OiB0aGlzLnRvU3F1YXJlLnggKiBncmlkU2l6ZSxcclxuICAgICAgICAgICAgeTogdGhpcy50b1NxdWFyZS55ICogZ3JpZFNpemUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIGNvbnN0IHJlbmRlck5vZGUgPSB0aGlzLnBlcnNvbi5yZW5kZXJOb2Rlcy53YWxraW5nW3RoaXMuZGlyZWN0aW9uXTtcclxuICAgICAgICByZW5kZXJOb2RlLnNldFgodGhpcy5mcm9tUHgueCk7XHJcbiAgICAgICAgcmVuZGVyTm9kZS5zZXRZKHRoaXMuZnJvbVB4LnkpO1xyXG4gICAgICAgIHRoaXMucGVyc29uLmN1cnJlbnRSZW5kZXJOb2RlID0gcmVuZGVyTm9kZTtcclxuICAgICAgICB0aGlzLnBlcnNvbi5ncmlkWCA9IHRoaXMudG9TcXVhcmUueDtcclxuICAgICAgICB0aGlzLnBlcnNvbi5ncmlkWSA9IHRoaXMudG9TcXVhcmUueTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZnJhbWVUaW1lU3RhbXA6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGFtb3VudENvbXBsZXRlID0gKGZyYW1lVGltZVN0YW1wIC0gdGhpcy5zdGFydFRpbWUpIC8gdGhpcy5kdXJhdGlvbjtcclxuICAgICAgICBpZiAoYW1vdW50Q29tcGxldGUgPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyc29uLmN1cnJlbnRSZW5kZXJOb2RlLnNldFgodGhpcy5mcm9tUHgueCArIE1hdGgucm91bmQodGhpcy54Q2hhbmdlICogYW1vdW50Q29tcGxldGUpKTtcclxuICAgICAgICAgICAgdGhpcy5wZXJzb24uY3VycmVudFJlbmRlck5vZGUuc2V0WSh0aGlzLmZyb21QeC55ICsgTWF0aC5yb3VuZCh0aGlzLnlDaGFuZ2UgKiBhbW91bnRDb21wbGV0ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyc29uLnNuYXBDdXJyZW50UmVuZGVyTm9kZVRvR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==