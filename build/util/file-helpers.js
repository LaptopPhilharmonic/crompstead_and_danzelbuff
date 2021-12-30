"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesRecursively = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 *  Get all files under a directory, including sub-directories.
 *  Thanks arthurDent on Stack Overflow: https://stackoverflow.com/a/66187152/17788501
 */
const getFilesRecursively = (directory) => {
    let files = [];
    const filesInDirectory = fs_1.default.readdirSync(directory);
    for (const file of filesInDirectory) {
        const absolute = path_1.default.join(directory, file);
        if (fs_1.default.statSync(absolute).isDirectory()) {
            files = files.concat((0, exports.getFilesRecursively)(absolute));
        }
        else {
            files.push(absolute);
        }
    }
    return files;
};
exports.getFilesRecursively = getFilesRecursively;
//# sourceMappingURL=file-helpers.js.map