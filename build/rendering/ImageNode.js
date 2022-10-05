"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageNode = void 0;
const import_manager_js_1 = require("../import-manager.js");
class ImageNode extends import_manager_js_1.RenderNode {
    constructor(data) {
        super(data);
        this.imageName = data.imageName;
        this.autoWidth = data.w === undefined;
        this.autoHeight = data.h === undefined;
    }
}
exports.ImageNode = ImageNode;
//# sourceMappingURL=ImageNode.js.map