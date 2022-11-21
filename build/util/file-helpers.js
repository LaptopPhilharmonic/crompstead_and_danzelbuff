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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbC9maWxlLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUV4Qjs7O0dBR0c7QUFDSSxNQUFNLG1CQUFtQixHQUFHLENBQUMsU0FBaUIsRUFBWSxFQUFFO0lBQy9ELElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUN6QixNQUFNLGdCQUFnQixHQUFHLFlBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsS0FBSyxNQUFNLElBQUksSUFBSSxnQkFBZ0IsRUFBRTtRQUNqQyxNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLFlBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDckMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBQSwyQkFBbUIsRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0o7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDLENBQUM7QUFaVyxRQUFBLG1CQUFtQix1QkFZOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbi8qKlxyXG4gKiAgR2V0IGFsbCBmaWxlcyB1bmRlciBhIGRpcmVjdG9yeSwgaW5jbHVkaW5nIHN1Yi1kaXJlY3Rvcmllcy5cclxuICogIFRoYW5rcyBhcnRodXJEZW50IG9uIFN0YWNrIE92ZXJmbG93OiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjYxODcxNTIvMTc3ODg1MDFcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRGaWxlc1JlY3Vyc2l2ZWx5ID0gKGRpcmVjdG9yeTogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xyXG4gICAgbGV0IGZpbGVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgY29uc3QgZmlsZXNJbkRpcmVjdG9yeSA9IGZzLnJlYWRkaXJTeW5jKGRpcmVjdG9yeSk7XHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXNJbkRpcmVjdG9yeSkge1xyXG4gICAgICAgIGNvbnN0IGFic29sdXRlID0gcGF0aC5qb2luKGRpcmVjdG9yeSwgZmlsZSk7XHJcbiAgICAgICAgaWYgKGZzLnN0YXRTeW5jKGFic29sdXRlKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgIGZpbGVzID0gZmlsZXMuY29uY2F0KGdldEZpbGVzUmVjdXJzaXZlbHkoYWJzb2x1dGUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaWxlcy5wdXNoKGFic29sdXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlsZXM7XHJcbn07Il19