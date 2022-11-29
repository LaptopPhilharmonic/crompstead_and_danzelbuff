import { Action, Person } from '../../../import-manager.js';
export declare class Wait extends Action {
    waitMillis: number;
    person: Person;
    constructor(person: Person, waitMillis: number);
    update(frameTimeStamp: number): void;
}
