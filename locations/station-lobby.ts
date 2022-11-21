import { Location } from '../import-manager.js';
import { Grid } from '../import-manager.js';
import { AnimationNode, Crompstead } from '../import-manager.js';

export function init(): Location { 
    const lobby = new Location(240, 160, 'places/station-lobby.png', new Grid([
        'XXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXX',
        'X---X---XXXXXXX',
        'X---X-----XXXXX',
        'X---X-XXX-----X',
        'XXXXX-----X---X',
        'X-----XXX-X---X',
        'X---------X---X',
        'X-----XXX-----X',
        'XXXXXXXXXXXXXXX',
        'XXXXXXXXXXXXXXX',    
    ]));

    [6, 7, 8].forEach((x) => {
        lobby.addGridImage(x, 8, 'objects/chair-blue-u.png');
        lobby.addGridImage(x, 4, 'objects/chair-blue-d.png');
    });

    [5, 6, 7].forEach((y) => {
        lobby.addGridImage(10, y, 'objects/chair-blue-l.png');
    });

    lobby.addGridImage(6, 6, 'objects/station-lobby-table.png');
    lobby.addGridImage(0, 5, 'objects/station-lobby-desk.png');
    lobby.addGridImage(8, 2, 'objects/water-cooler.png');
    lobby.addGridImage(9, 2, 'objects/station-bin.png');

    const crompstead = new Crompstead;
    crompstead.goesTo(lobby, 2, 7);
    crompstead.acceptingInput = true;

    return lobby;
}