"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageNode = void 0;
const render_node_1 = require("./render-node");
class ImageNode extends render_node_1.RenderNode {
    constructor(data) {
        super(data);
        this.imageName = data.imageName;
    }
}
exports.ImageNode = ImageNode;
//# sourceMappingURL=image-node.js.map