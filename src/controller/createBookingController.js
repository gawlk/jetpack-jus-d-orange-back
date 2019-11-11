import { Booking } from '../entity';
import { db } from '../db';
import { BookingRepository } from '../repository';
 
export const createBookingController = (req, res) => {
    const booking = new Booking(
        req.body.jetpack_id,
        new Date(req.body.start_date),
        new Date(req.body.end_date),
    );

    const repository = new BookingRepository(db);
    repository.create(booking);

    res.header('Access-Control-Allow-Origin', '*');
    res.status(201).send(booking.toJson());
};
