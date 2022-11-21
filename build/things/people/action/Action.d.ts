export declare abstract class Action {
    inProgress: boolean;
    complete: boolean;
    protected onComplete?: () => void;
    protected startTime: number;
    constructor();
    start(): void;
    finish(): void;
    then(fn: () => void): void;
    abstract update(frameTimeStamp: number): void;
}
