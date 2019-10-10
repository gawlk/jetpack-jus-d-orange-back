import uuid from 'uuidv4';

import { db } from '../db';
import { Jetpack } from '../entity';
import { JetpackRepository } from '../repository';

export const createJetpackController = (req, res) => {
    console.log(req.body);
    let jetpack = new Jetpack();
    jetpack.id = uuid();
    jetpack.name = req.body.name;
    jetpack.image = req.body.image;

    const repository = new JetpackRepository(db);
    repository.create(jetpack);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(201).send(jetpack.toJson())
};
