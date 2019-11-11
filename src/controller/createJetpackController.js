import uuid from 'uuidv4';

import { db } from '../db';
import { Jetpack } from '../entity';
import { JetpackRepository } from '../repository';

export const createJetpackController = (req, res) => {
    const jetpack = new Jetpack(uuid(), req.body.name, req.body.image);

    const repository = new JetpackRepository(db);

    res.header('Access-Control-Allow-Origin', '*');

    repository.create(jetpack);
    res.status(201).send(jetpack.toJson());
};
