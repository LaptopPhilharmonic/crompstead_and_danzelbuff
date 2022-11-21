"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronicaGame = exports.gameData = void 0;
const import_manager_js_1 = require("./import-manager.js");
const import_manager_js_2 = require("./import-manager.js");
const import_manager_js_3 = require("./import-manager.js");
const import_manager_js_4 = require("./import-manager.js");
const displayHelpers = __importStar(require("./util/display-helpers.js"));
class ElectronicaGame {
    constructor(options) {
        var _a, _b, _c, _d;
        this.data = new import_manager_js_1.GameData({
            imageFolder: 'assets\\images\\',
            audioFolder: 'assets\\audio\\',
            screenInfo: displayHelpers.getScreenInfo(),
            allowedImageTypes: (_a = options.allowedImageTypes) !== null && _a !== void 0 ? _a : ['png', 'jpg'],
            allowedAudioTypes: (_b = options.allowedAudioTypes) !== null && _b !== void 0 ? _b : ['mp3', 'wav'],
            frameRate: (_c = options.frameRate) !== null && _c !== void 0 ? _c : 30,
            imageSmoothing: (_d = options.imageSmoothing) !== null && _d !== void 0 ? _d : false,
        });
        exports.gameData = this.data;
        const dpr = exports.gameData.globals.screenInfo.devicePixelRatio;
        this.renderer = new import_manager_js_2.Renderer(options.canvas);
        this.data.loadAllAssetsThen(() => {
            this.renderer.handleCanvasResize();
            this.data.currentScene = import_manager_js_3.stationLobby.init();
            console.log('station lobby intted');
            let quit = false;
            let lastRender = 0;
            const frameLength = Math.round(1000 / this.data.globals.frameRate);
            const camera = new import_manager_js_4.Camera({ x: 0, y: 0, zoom: 3 });
            const inputManager = new import_manager_js_1.InputManager();
            inputManager.listenTo(window);
            camera.centreOnScene(this.data.currentScene);
            const loop = () => {
                const frameTimeStamp = new Date().valueOf();
                if (frameTimeStamp - lastRender > frameLength) {
                    const inputData = inputManager.cycleKeyData();
                    import_manager_js_1.Thing.forEach((thing) => {
                        thing.handleInput(inputData);
                        thing.update(frameTimeStamp);
                    });
                    if (this.data.currentScene) {
                        this.data.currentScene;
                        this.renderer.renderScene(this.data.currentScene, camera);
                        lastRender = frameTimeStamp;
                    }
                }
                if (!quit) {
                    const timePassed = new Date().valueOf() - frameTimeStamp;
                    setTimeout(loop, Math.max(exports.gameData.frameLengthMillis - timePassed, 1));
                }
            };
            setTimeout(loop, 10);
        });
    }
}
exports.ElectronicaGame = ElectronicaGame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlY3Ryb25pY2FHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vRWxlY3Ryb25pY2FHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQW9FO0FBQ3BFLDJEQUErQztBQUMvQywyREFBbUQ7QUFDbkQsMkRBQTZDO0FBQzdDLDBFQUE0RDtBQWtCNUQsTUFBYSxlQUFlO0lBSXhCLFlBQVksT0FBK0I7O1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSw0QkFBUSxDQUFDO1lBQ3JCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixVQUFVLEVBQUUsY0FBYyxDQUFDLGFBQWEsRUFBRTtZQUMxQyxpQkFBaUIsRUFBRSxNQUFBLE9BQU8sQ0FBQyxpQkFBaUIsbUNBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQzlELGlCQUFpQixFQUFFLE1BQUEsT0FBTyxDQUFDLGlCQUFpQixtQ0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDOUQsU0FBUyxFQUFFLE1BQUEsT0FBTyxDQUFDLFNBQVMsbUNBQUksRUFBRTtZQUNsQyxjQUFjLEVBQUUsTUFBQSxPQUFPLENBQUMsY0FBYyxtQ0FBSSxLQUFLO1NBQ2xELENBQUMsQ0FBQztRQUVILGdCQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixNQUFNLEdBQUcsR0FBRyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFFekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDRCQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxnQ0FBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtZQUVuQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7WUFDakIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sTUFBTSxHQUFHLElBQUksMEJBQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNqRCxNQUFNLFlBQVksR0FBRyxJQUFJLGdDQUFZLEVBQUUsQ0FBQztZQUN4QyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU3QyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUMsSUFBSSxjQUFjLEdBQUcsVUFBVSxHQUFHLFdBQVcsRUFBRTtvQkFDM0MsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUM5Qyx5QkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNwQixLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNqQyxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQTt3QkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQzFELFVBQVUsR0FBRyxjQUFjLENBQUM7cUJBQy9CO2lCQUNKO2dCQUNELElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1AsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxjQUFjLENBQUM7b0JBQ3pELFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBUSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxRTtZQUNMLENBQUMsQ0FBQTtZQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUExREQsMENBMERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZURhdGEsIElucHV0TWFuYWdlciwgVGhpbmcgfSBmcm9tICcuL2ltcG9ydC1tYW5hZ2VyLmpzJztcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL2ltcG9ydC1tYW5hZ2VyLmpzJztcclxuaW1wb3J0IHsgc3RhdGlvbkxvYmJ5IH0gZnJvbSAnLi9pbXBvcnQtbWFuYWdlci5qcyc7XHJcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4vaW1wb3J0LW1hbmFnZXIuanMnO1xyXG5pbXBvcnQgKiBhcyBkaXNwbGF5SGVscGVycyBmcm9tICcuL3V0aWwvZGlzcGxheS1oZWxwZXJzLmpzJztcclxuXHJcbnR5cGUgRWxlY3Ryb25pY2FHYW1lT3B0aW9ucyA9IHtcclxuICAgIC8qKiBNYWluIDxjYW52YXM+IGVsZW1lbnQgZm9yIHRoZSBnYW1lIHRvIHJlbmRlciB0byAqL1xyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIC8qKiBBbGxvd2VkIGV4dGVuc2lvbnMgb24gaW1hZ2UgZmlsZXMgKGRlZmF1bHRzIHRvIFsncG5nJywgJ2pwZyddIGlmIHVuc3BlY2lmaWVkKSAqL1xyXG4gICAgYWxsb3dlZEltYWdlVHlwZXM/OiBzdHJpbmdbXTtcclxuICAgIC8qKiBBbGxvd2VkIGV4dGVuc2lvbnMgb24gYXVkaW8gZmlsZXMgKGRlZmF1bHRzIHRvIFsnbXAzJywgJ3dhdiddIGlmIHVuc3BlY2lmaWVkKSAqL1xyXG4gICAgYWxsb3dlZEF1ZGlvVHlwZXM/OiBzdHJpbmdbXTtcclxuICAgIC8qKiBUYXJnZXQgZnJhbWVyYXRlIGZvciB0aGUgZ2FtZSB0byByZW5kZXIgYXQuIERlZmF1bHQgaXMgMzAuICovXHJcbiAgICBmcmFtZVJhdGU/OiBudW1iZXI7XHJcbiAgICAvKiogRGVmYXVsdCBmYWxzZS4gRmFsc2UgPSBjaHVua3kgcGl4ZWxzLCB0cnVlID0gYmx1cnJ5LiAqL1xyXG4gICAgaW1hZ2VTbW9vdGhpbmc/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgR2FtZURhdGEgaW5zdGFuY2UsIHVzZWQgYWxsIG92ZXIgdGhlIHNob3AgZm9yIGNvbnRleHQgKi9cclxuZXhwb3J0IGxldCBnYW1lRGF0YTogR2FtZURhdGE7XHJcblxyXG5leHBvcnQgY2xhc3MgRWxlY3Ryb25pY2FHYW1lIHtcclxuICAgIGRhdGE6IEdhbWVEYXRhO1xyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEVsZWN0cm9uaWNhR2FtZU9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgR2FtZURhdGEoe1xyXG4gICAgICAgICAgICBpbWFnZUZvbGRlcjogJ2Fzc2V0c1xcXFxpbWFnZXNcXFxcJyxcclxuICAgICAgICAgICAgYXVkaW9Gb2xkZXI6ICdhc3NldHNcXFxcYXVkaW9cXFxcJyxcclxuICAgICAgICAgICAgc2NyZWVuSW5mbzogZGlzcGxheUhlbHBlcnMuZ2V0U2NyZWVuSW5mbygpLFxyXG4gICAgICAgICAgICBhbGxvd2VkSW1hZ2VUeXBlczogb3B0aW9ucy5hbGxvd2VkSW1hZ2VUeXBlcyA/PyBbJ3BuZycsICdqcGcnXSxcclxuICAgICAgICAgICAgYWxsb3dlZEF1ZGlvVHlwZXM6IG9wdGlvbnMuYWxsb3dlZEF1ZGlvVHlwZXMgPz8gWydtcDMnLCAnd2F2J10sXHJcbiAgICAgICAgICAgIGZyYW1lUmF0ZTogb3B0aW9ucy5mcmFtZVJhdGUgPz8gMzAsXHJcbiAgICAgICAgICAgIGltYWdlU21vb3RoaW5nOiBvcHRpb25zLmltYWdlU21vb3RoaW5nID8/IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBnYW1lRGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgICBjb25zdCBkcHIgPSBnYW1lRGF0YS5nbG9iYWxzLnNjcmVlbkluZm8uZGV2aWNlUGl4ZWxSYXRpbztcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcihvcHRpb25zLmNhbnZhcyk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YS5sb2FkQWxsQXNzZXRzVGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaGFuZGxlQ2FudmFzUmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRhdGEuY3VycmVudFNjZW5lID0gc3RhdGlvbkxvYmJ5LmluaXQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0YXRpb24gbG9iYnkgaW50dGVkJylcclxuXHJcbiAgICAgICAgICAgIGxldCBxdWl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBsYXN0UmVuZGVyID0gMDtcclxuICAgICAgICAgICAgY29uc3QgZnJhbWVMZW5ndGggPSBNYXRoLnJvdW5kKDEwMDAgLyB0aGlzLmRhdGEuZ2xvYmFscy5mcmFtZVJhdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgQ2FtZXJhKHt4OiAwLCB5OiAwLCB6b29tOiAzfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0TWFuYWdlciA9IG5ldyBJbnB1dE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgaW5wdXRNYW5hZ2VyLmxpc3RlblRvKHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICBjYW1lcmEuY2VudHJlT25TY2VuZSh0aGlzLmRhdGEuY3VycmVudFNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxvb3AgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZVRpbWVTdGFtcCA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZyYW1lVGltZVN0YW1wIC0gbGFzdFJlbmRlciA+IGZyYW1lTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXREYXRhID0gaW5wdXRNYW5hZ2VyLmN5Y2xlS2V5RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoaW5nLmZvckVhY2goKHRoaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaW5nLmhhbmRsZUlucHV0KGlucHV0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaW5nLnVwZGF0ZShmcmFtZVRpbWVTdGFtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5jdXJyZW50U2NlbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmN1cnJlbnRTY2VuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclNjZW5lKHRoaXMuZGF0YS5jdXJyZW50U2NlbmUsIGNhbWVyYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSZW5kZXIgPSBmcmFtZVRpbWVTdGFtcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXF1aXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUGFzc2VkID0gbmV3IERhdGUoKS52YWx1ZU9mKCkgLSBmcmFtZVRpbWVTdGFtcDtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIE1hdGgubWF4KGdhbWVEYXRhLmZyYW1lTGVuZ3RoTWlsbGlzIC0gdGltZVBhc3NlZCwgMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3AsIDEwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==