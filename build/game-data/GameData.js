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
exports.GameData = void 0;
const fileHelpers = __importStar(require("../util/file-helpers.js"));
let imagesToLoad = 0;
let audioToLoad = 0;
let imagesLoaded = 0;
let audioLoaded = 0;
let loadChecker;
class GameData {
    constructor(globals) {
        this.globals = globals;
        this.images = {
            byKey: {},
        };
        this.audio = {
            byKey: {},
        };
        this.events = {};
        this.frameLengthMillis = Math.round(1000 / globals.frameRate);
    }
    addImage(key, image) {
        console.log(`key: ${key}, image: ${image}`);
        this.images.byKey[key] = image;
    }
    addAudio(key, audio) {
        this.audio.byKey[key] = audio;
    }
    loadImagesFromImageFolder() {
        const files = fileHelpers.getFilesRecursively(this.globals.imageFolder);
        files.forEach((filename) => {
            var _a;
            if (this.globals.allowedImageTypes.includes((_a = filename.split('.').pop()) !== null && _a !== void 0 ? _a : '')) {
                imagesToLoad += 1;
                const key = filename.replace(this.globals.imageFolder, '').replace(/\\/g, '/');
                this.addImage(key, document.createElement('img'));
                this.images.byKey[key].src = filename;
                this.images.byKey[key].onload = () => { imagesLoaded += 1; };
            }
        });
    }
    loadAudioFromAudioFolder() {
        const files = fileHelpers.getFilesRecursively(this.globals.audioFolder);
        files.forEach((filename) => {
            var _a;
            if (this.globals.allowedAudioTypes.includes((_a = filename.split('.').pop()) !== null && _a !== void 0 ? _a : '')) {
                audioToLoad += 1;
                const key = filename.replace(this.globals.audioFolder, '');
                this.addAudio(key, document.createElement('audio'));
                this.audio.byKey[key].src = filename;
                this.audio.byKey[key].oncanplaythrough = () => { audioLoaded += 1; };
            }
        });
    }
    loadAllAssetsThen(afterLoadFunction) {
        this.afterLoadFunction = afterLoadFunction;
        this.loadImagesFromImageFolder();
        this.loadAudioFromAudioFolder();
        console.log('Loading assets...');
        if (imagesToLoad + audioToLoad === 0) {
            console.log('...no assets found.');
        }
        else {
            setTimeout(() => { this.checkAllAssetsLoaded(); }, 100);
        }
    }
    checkAllAssetsLoaded() {
        const totalToLoad = audioToLoad + imagesToLoad;
        const totalLoaded = audioLoaded + imagesLoaded;
        if (totalLoaded === totalToLoad) {
            console.log('...all assets loaded');
            if (typeof this.afterLoadFunction === 'function') {
                console.log('!!!!afterload');
                this.afterLoadFunction();
            }
        }
        else {
            console.log(`...${(Math.round(totalLoaded / totalToLoad * 100))}%`);
            setTimeout(() => { this.checkAllAssetsLoaded; }, 100);
        }
    }
}
exports.GameData = GameData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9nYW1lLWRhdGEvR2FtZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxxRUFBdUQ7QUFFdkQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNwQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLElBQUksV0FBdUMsQ0FBQztBQWlDNUMsTUFBYSxRQUFRO0lBVWpCLFlBQVksT0FBbUI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUE7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFFTyxRQUFRLENBQUMsR0FBVyxFQUFFLEtBQXVCO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFXLEVBQUUsS0FBdUI7UUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFTyx5QkFBeUI7UUFDN0IsTUFBTSxL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RyxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBQy9DLElBQUksV0FBVyxLQUFLLFdBQVcsRUFBRTtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEMsSUFBSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLEVBQUU7Z0JBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7Z0JBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1NBQ0o7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRSxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztDQUNKO0FBdkZELDRCQXVGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjZW5lIH0gZnJvbSAnLi4vaW1wb3J0LW1hbmFnZXIuanMnO1xyXG5pbXBvcnQgdHlwZSB7IFNjcmVlbkluZm8gfSBmcm9tICcuLi91dGlsL2Rpc3BsYXktaGVscGVycy5qcyc7XHJcbmltcG9ydCAqIGFzIGZpbGVIZWxwZXJzIGZyb20gJy4uL3V0aWwvZmlsZS1oZWxwZXJzLmpzJztcclxuXHJcbmxldCBpbWFnZXNUb0xvYWQgPSAwO1xyXG5sZXQgYXVkaW9Ub0xvYWQgPSAwO1xyXG5sZXQgaW1hZ2VzTG9hZGVkID0gMDtcclxubGV0IGF1ZGlvTG9hZGVkID0gMDtcclxubGV0IGxvYWRDaGVja2VyOiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZDtcclxuXHJcbi8qKlxyXG4gKiBBbGwgdGhlIGltYWdlcyB0aGF0IGhhdmUgYmVlbiBsb2FkZWQgaW50byB0aGUgZ2FtZVxyXG4gKi9cclxudHlwZSBJbWFnZURhdGEgPSB7XHJcbiAgICAvKiogQWxsIGltYWdlcywgaW5kZXhlZCBieSB0aGVpciBVUkwsIHJlbGF0aXZlIHRvIC9pbWFnZXMgKi9cclxuICAgIGJ5S2V5OiB7W2luZGV4OiBzdHJpbmddOiBIVE1MSW1hZ2VFbGVtZW50fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFsbCB0aGUgYXVkaW8gZmlsZXMgdGhhdCBoYXZlIGJlZW4gbG9hZGVkIGludG8gdGhlIGdhbWVcclxuICovXHJcbnR5cGUgQXVkaW9EYXRhID0ge1xyXG4gICAgLyoqIEFsbCBhdWRpbyBmaWxlcywgaW5kZXhlZCBieSB0aGVpciBVUkwsIHJlbGF0aXZlIHRvIC9pbWFnZXMgKi8gICAgXHJcbiAgICBieUtleToge1tpbmRleDogc3RyaW5nXTogSFRNTEF1ZGlvRWxlbWVudH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbmZvIHRoYXQgaXMgdHJ1ZSBhbmQgdmFsaWQgd2hhdGV2ZXIgcGFydCBvZiB0aGUgZ2FtZSBjb2RlIHdlJ3JlIGluXHJcbiAqL1xyXG50eXBlIEdsb2JhbERhdGEgPSB7XHJcbiAgICBpbWFnZUZvbGRlcjogc3RyaW5nO1xyXG4gICAgYXVkaW9Gb2xkZXI6IHN0cmluZztcclxuICAgIHNjcmVlbkluZm86IFNjcmVlbkluZm87XHJcbiAgICBhbGxvd2VkSW1hZ2VUeXBlczogc3RyaW5nW107XHJcbiAgICBhbGxvd2VkQXVkaW9UeXBlczogc3RyaW5nW107XHJcbiAgICBmcmFtZVJhdGU6IG51bWJlcjtcclxuICAgIGltYWdlU21vb3RoaW5nOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBFdmVudHNEYXRhID0ge307XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZURhdGEge1xyXG4gICAgZXZlbnRzOiBFdmVudHNEYXRhO1xyXG4gICAgZ2xvYmFsczogR2xvYmFsRGF0YTtcclxuICAgIGltYWdlczogSW1hZ2VEYXRhO1xyXG4gICAgYXVkaW86IEF1ZGlvRGF0YTtcclxuICAgIGN1cnJlbnRTY2VuZT86IFNjZW5lO1xyXG4gICAgYWZ0ZXJMb2FkRnVuY3Rpb24/OiAoKSA9PiB1bmtub3duO1xyXG4gICAgZnJhbWVMZW5ndGhNaWxsaXM6IG51bWJlcjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsczogR2xvYmFsRGF0YSkge1xyXG4gICAgICAgIHRoaXMuZ2xvYmFscyA9IGdsb2JhbHM7XHJcblxyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0ge1xyXG4gICAgICAgICAgICBieUtleToge30sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hdWRpbyA9IHtcclxuICAgICAgICAgICAgYnlLZXk6IHt9LFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5mcmFtZUxlbmd0aE1pbGxpcyA9IE1hdGgucm91bmQoMTAwMCAvIGdsb2JhbHMuZnJhbWVSYXRlKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkSW1hZ2Uoa2V5OiBzdHJpbmcsIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGtleTogJHtrZXl9LCBpbWFnZTogJHtpbWFnZX1gKTtcclxuICAgICAgICB0aGlzLmltYWdlcy5ieUtleVtrZXldID0gaW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRBdWRpbyhrZXk6IHN0cmluZywgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLmJ5S2V5W2tleV0gPSBhdWRpbztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRJbWFnZXNGcm9tSW1hZ2VGb2xkZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSBmaWxlSGVscGVycy5nZXRGaWxlc1JlY3Vyc2l2ZWx5KHRoaXMuZ2xvYmFscy5pbWFnZUZvbGRlcik7XHJcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZW5hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5hbGxvd2VkSW1hZ2VUeXBlcy5pbmNsdWRlcyhmaWxlbmFtZS5zcGxpdCgnLicpLnBvcCgpID8/ICcnKSkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VzVG9Mb2FkICs9IDE7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBmaWxlbmFtZS5yZXBsYWNlKHRoaXMuZ2xvYmFscy5pbWFnZUZvbGRlciwgJycpLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSW1hZ2Uoa2V5LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlcy5ieUtleVtrZXldLnNyYyA9IGZpbGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMuYnlLZXlba2V5XS5vbmxvYWQgPSAoKSA9PiB7IGltYWdlc0xvYWRlZCArPSAxOyB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQXVkaW9Gcm9tQXVkaW9Gb2xkZXIoKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSBmaWxlSGVscGVycy5nZXRGaWxlc1JlY3Vyc2l2ZWx5KHRoaXMuZ2xvYmFscy5hdWRpb0ZvbGRlcik7XHJcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZW5hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5hbGxvd2VkQXVkaW9UeXBlcy5pbmNsdWRlcyhmaWxlbmFtZS5zcGxpdCgnLicpLnBvcCgpID8/ICcnKSkge1xyXG4gICAgICAgICAgICAgICAgYXVkaW9Ub0xvYWQgKz0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGZpbGVuYW1lLnJlcGxhY2UodGhpcy5nbG9iYWxzLmF1ZGlvRm9sZGVyLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEF1ZGlvKGtleSwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLmJ5S2V5W2tleV0uc3JjID0gZmlsZW5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLmJ5S2V5W2tleV0ub25jYW5wbGF5dGhyb3VnaCA9ICgpID0+IHsgYXVkaW9Mb2FkZWQgKz0gMX1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRBbGxBc3NldHNUaGVuKGFmdGVyTG9hZEZ1bmN0aW9uOiAoKSA9PiB1bmtub3duKSB7XHJcbiAgICAgICAgdGhpcy5hZnRlckxvYWRGdW5jdGlvbiA9IGFmdGVyTG9hZEZ1bmN0aW9uO1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlc0Zyb21JbWFnZUZvbGRlcigpO1xyXG4gICAgICAgIHRoaXMubG9hZEF1ZGlvRnJvbUF1ZGlvRm9sZGVyKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0xvYWRpbmcgYXNzZXRzLi4uJyk7XHJcbiAgICAgICAgaWYgKGltYWdlc1RvTG9hZCArIGF1ZGlvVG9Mb2FkID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcuLi5ubyBhc3NldHMgZm91bmQuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY2hlY2tBbGxBc3NldHNMb2FkZWQoKSB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0FsbEFzc2V0c0xvYWRlZCgpIHtcclxuICAgICAgICBjb25zdCB0b3RhbFRvTG9hZCA9IGF1ZGlvVG9Mb2FkICsgaW1hZ2VzVG9Mb2FkO1xyXG4gICAgICAgIGNvbnN0IHRvdGFsTG9hZGVkID0gYXVkaW9Mb2FkZWQgKyBpbWFnZXNMb2FkZWQ7XHJcbiAgICAgICAgaWYgKHRvdGFsTG9hZGVkID09PSB0b3RhbFRvTG9hZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLi4uYWxsIGFzc2V0cyBsb2FkZWQnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFmdGVyTG9hZEZ1bmN0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnISEhIWFmdGVybG9hZCcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyTG9hZEZ1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgLi4uJHsoTWF0aC5yb3VuZCh0b3RhbExvYWRlZCAvIHRvdGFsVG9Mb2FkICogMTAwKSl9JWApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5jaGVja0FsbEFzc2V0c0xvYWRlZCB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==