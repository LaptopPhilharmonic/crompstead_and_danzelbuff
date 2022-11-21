export abstract class Action {
    inProgress: boolean;
    complete: boolean;
    protected onComplete?: () => void;
    protected startTime: number;

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

    then(fn: () => void) {
        this.onComplete = fn;
    }

    abstract update(frameTimeStamp: number): void;
}