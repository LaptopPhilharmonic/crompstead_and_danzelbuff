import { Action, Person, gameData } from '../../../import-manager.js';

export class Wait extends Action {
    waitMillis: number;
    person: Person;

    constructor(person: Person, waitMillis: number) {
        super();
        this.waitMillis = waitMillis;
        this.person = person;
    }

    update(frameTimeStamp: number) {
        if (frameTimeStamp - this.startTime > this.waitMillis) {
            this.finish();
        }
    }
}