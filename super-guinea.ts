import { ElectronicaGame } from "./game";

// Main entry point for SuperGuinea game

window.addEventListener('DOMContentLoaded', () => {
    const game = new ElectronicaGame({
        canvas: document.querySelector("#e-game-canvas") as HTMLCanvasElement
    });
});
