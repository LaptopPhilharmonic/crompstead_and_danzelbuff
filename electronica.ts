import { ElectronicaGame } from "./ElectronicaGame";

// Main entry point for Crompstead and Danzelbuff and The Phantom Shoplifter

window.addEventListener('DOMContentLoaded', () => {
    const game = new ElectronicaGame({
        canvas: document.querySelector("#e-game-canvas") as HTMLCanvasElement
    });
});
