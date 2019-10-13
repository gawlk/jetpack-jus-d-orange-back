import low from 'lowdb';
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const defaultJetpack = {
    id: '48f3c314-75c7-4202-be2e-1b574235287b',
    name: 'Fortnite jetpack',
    image: 'https://gamepedia.cursecdn.com/fortnite_gamepedia/e/e1/Jetpack_icon.png',
};

db.defaults({ jetpacks: [
    defaultJetpack,
]}).write();

export {
    db,
    defaultJetpack,
};
