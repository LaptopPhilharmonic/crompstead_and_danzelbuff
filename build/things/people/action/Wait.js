"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wait = void 0;
const import_manager_js_1 = require("../../../import-manager.js");
class Wait extends import_manager_js_1.Action {
    constructor(person, waitMillis) {
        super();
        this.waitMillis = waitMillis;
        this.person = person;
    }
    update(frameTimeStamp) {
        if (frameTimeStamp - this.startTime > this.waitMillis) {
            this.finish();
        }
    }
}
exports.Wait = Wait;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RoaW5ncy9wZW9wbGUvYWN0aW9uL1dhaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0VBQXNFO0FBRXRFLE1BQWEsSUFBSyxTQUFRLDBCQUFNO0lBSTVCLFlBQVksTUFBYyxFQUFFLFVBQWtCO1FBQzFDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFzQjtRQUN6QixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztDQUNKO0FBZkQsb0JBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24sIFBlcnNvbiwgZ2FtZURhdGEgfSBmcm9tICcuLi8uLi8uLi9pbXBvcnQtbWFuYWdlci5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FpdCBleHRlbmRzIEFjdGlvbiB7XHJcbiAgICB3YWl0TWlsbGlzOiBudW1iZXI7XHJcbiAgICBwZXJzb246IFBlcnNvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwZXJzb246IFBlcnNvbiwgd2FpdE1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLndhaXRNaWxsaXMgPSB3YWl0TWlsbGlzO1xyXG4gICAgICAgIHRoaXMucGVyc29uID0gcGVyc29uO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShmcmFtZVRpbWVTdGFtcDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGZyYW1lVGltZVN0YW1wIC0gdGhpcy5zdGFydFRpbWUgPiB0aGlzLndhaXRNaWxsaXMpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=