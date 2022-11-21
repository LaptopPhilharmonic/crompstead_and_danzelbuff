import { Person } from '../../import-manager.js';

export class Danzelbuff extends Person {
    constructor() {
        super({
            firstName: 'Brant',
            surname: 'Danzelbuff',
            jobTitle: 'Investigative Detector',
            imgFolder: 'danzelbuff',
        });
    }
}