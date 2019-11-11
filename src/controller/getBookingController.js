import { db } from '../db';
import { BookingRepository } from '../repository';

export const getBookingController = (req, res) => {
    const repository = new BookingRepository(db);
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send(repository.getAll());
};
