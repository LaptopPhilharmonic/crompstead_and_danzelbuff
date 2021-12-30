"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
// Main entry point for SuperGuinea game
window.addEventListener('DOMContentLoaded', () => {
    const game = new game_1.ElectronicaGame({
        canvas: document.querySelector("#e-game-canvas")
    });
});
//# sourceMappingURL=super-guinea.js.map