"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
class Action {
    constructor() {
        this.inProgress = false;
        this.complete = false;
        this.startTime = 0;
    }
    start() {
        if (this.inProgress) {
            throw new Error('Tried to start action but it was already in progress');
        }
        this.startTime = new Date().valueOf();
        this.inProgress = true;
    }
    finish() {
        this.inProgress = false;
        this.complete = true;
        if (typeof this.onComplete === 'function') {
            this.onComplete();
        }
    }
    then(fn) {
        this.onComplete = fn;
    }
}
exports.Action = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGhpbmdzL3Blb3BsZS9hY3Rpb24vQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQXNCLE1BQU07SUFNeEI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQyxFQUFjO1FBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztDQUdKO0FBakNELHdCQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3Rpb24ge1xyXG4gICAgaW5Qcm9ncmVzczogYm9vbGVhbjtcclxuICAgIGNvbXBsZXRlOiBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIG9uQ29tcGxldGU/OiAoKSA9PiB2b2lkO1xyXG4gICAgcHJvdGVjdGVkIHN0YXJ0VGltZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIHN0YXJ0IGFjdGlvbiBidXQgaXQgd2FzIGFscmVhZHkgaW4gcHJvZ3Jlc3MnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcclxuICAgICAgICB0aGlzLmluUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmlzaCgpIHtcclxuICAgICAgICB0aGlzLmluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25Db21wbGV0ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhlbihmbjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMub25Db21wbGV0ZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IHVwZGF0ZShmcmFtZVRpbWVTdGFtcDogbnVtYmVyKTogdm9pZDtcclxufSJdfQ==