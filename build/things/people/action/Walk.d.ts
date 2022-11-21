import { Action, Person } from '../../../import-manager.js';
export declare type WalkDirection = 'up' | 'down' | 'left' | 'right';
export interface WalkData {
    /** The person doing the walking */
    person: Person;
    /** The direction the person is walking in */
    direction: WalkDirection;
    /** How long this one square walk should last in milliseconds. Default 300 */
    duration: number;
}
export declare class Walk extends Action {
    private person;
    private direction;
    private duration;
    private fromSquare;
    private toSquare;
    private fromPx;
    private toPx;
    private xChange;
    private yChange;
    constructor(person: Person, direction: WalkDirection, duration?: number);
    start(): void;
    update(frameTimeStamp: number): void;
}
