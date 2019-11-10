import { db } from '../db';
import { JetpackRepository } from '../repository';

export const getJetpackController = (req, res) => {
    const repository = new JetpackRepository(db);
    res.header('Access-Control-Allow-Origin', '*');

    if (req.query.start_date && req.query.end_date) {
        const date1 = new Date(req.query.start_date);
        const date2 = new Date(req.query.end_date);

        res.status(200).send(repository.getAvailable(date1, date2));
    } else {
        res.status(200).send(repository.getAll());
    }
};

