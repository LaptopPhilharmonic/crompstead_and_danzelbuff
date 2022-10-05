"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const import_manager_js_1 = require("../import-manager.js");
const import_manager_js_2 = require("../import-manager.js");
const import_manager_js_3 = require("../import-manager.js");
function init() {
    const lobby = new import_manager_js_1.Location(240, 160, 'places/station-lobby.png', new import_manager_js_2.Grid([
        'XXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXX',
        'X---X---XXXXXXX',
        'X---X-----XXXXX',
        'X---X-XXX-----X',
        'XXXXX-----X---X',
        'X-----XXX-X---X',
        'X---------X---X',
        'X-----XXX-----X',
        'XXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXX',
    ]));
    [6, 7, 8].forEach((x) => {
        lobby.addGridImage(x, 8, 'objects/chair-blue-u.png');
        lobby.addGridImage(x, 4, 'objects/chair-blue-d.png');
    });
    [5, 6, 7].forEach((y) => {
        lobby.addGridImage(10, y, 'objects/chair-blue-l.png');
    });
    lobby.addGridImage(6, 6, 'objects/station-lobby-table.png');
    lobby.addGridImage(0, 5, 'objects/station-lobby-desk.png');
    lobby.addGridImage(8, 2, 'objects/water-cooler.png');
    lobby.addGridImage(9, 2, 'objects/station-bin.png');
    const crompstead = new import_manager_js_3.AnimationNode({
        imageName: 'people/crompstead/walking-d.png',
        w: 64,
        h: 64,
        frameMillis: 250,
        scene: lobby.id,
    });
    lobby.addGridAnimation(2, 7, crompstead);
    return lobby;
}
exports.init = init;
//# sourceMappingURL=station-lobby.js.map