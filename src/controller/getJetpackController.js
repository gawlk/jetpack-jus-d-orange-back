import { db } from '../db';
import { JetpackRepository } from '../repository';

export const getJetpackController = (req, res) => {
    const repository = new JetpackRepository(db);

    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(repository.getAll());
};
