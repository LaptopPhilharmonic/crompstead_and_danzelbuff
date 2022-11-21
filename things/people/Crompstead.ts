import { Person } from '../../import-manager.js';

export class Crompstead extends Person {
    constructor() {
        super({
            firstName: 'Alan',
            surname: 'Crompstead',
            jobTitle: 'Investigative Detector',
            imgFolder: 'crompstead',
        });
    }
}