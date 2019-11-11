import { db } from '../db';
import { Jetpack } from '../entity';
import { JetpackRepository } from '../repository';

export const updateJetpackController = (req, res) => {
    const jetpack = new Jetpack(
        req.body.id,
        req.body.name,
        req.body.image
    );

    const repository = new JetpackRepository(db);
    repository.update(jetpack);

    res.header('Access-Control-Allow-Origin', '*');
    res.status(201).send(jetpack.toJson());
};
