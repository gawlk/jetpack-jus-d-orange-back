import { JetpackRepository } from './jetpackRepository';

export const ErrorMessageBooking = {
    MissingDatabase: 'ERROR: db object is missing.',
    MissingBooking: 'ERROR: Booking object is missing.',
    WrongTypeBooking: 'ERROR: The parameter must be a Booking object',
    ImpossibleDateBooking: 'ERROR : Jetpack already booked for those dates', 
    NoJetPackWithId : 'ERROR : No jetpack was found for this id',  
}

export class BookingRepository {
    constructor(db) {
        if (! db) {
            throw ErrorMessageBooking.MissingDatabase;
        }

        this.db = db;
    }

    areDatesOverlapping(b1, b2) {
        const b1StartsInb2 = new Date(b1.start_date) < new Date(b2.end_date)
            && new Date(b1.end_date) > new Date(b2.end_date);

        const b1EndsInb2 = new Date(b1.end_date) > new Date(b2.start_date)
            && new Date(b1.start_date) < new Date(b2.start_date);

        const b1IsAroundb2 = new Date(b1.start_date) >= new Date(b2.start_date)
            && new Date(b1.end_date) <= new Date(b2.end_date);

        return b1StartsInb2 || b1EndsInb2 || b1IsAroundb2;
    }

    create(booking) {
        if (! booking) {
            throw ErrorMessageBooking.MissingBooking;
        } else if (booking.constructor.name !== 'Booking') {
            throw ErrorMessageBooking.WrongTypeBooking;
        }

        const jetpacksRepo = new JetpackRepository(this.db);
        jetpacksRepo.getById(booking.jetpack_id);
        
        if (! this.isPossibleBooking(booking)) {
            throw ErrorMessageBooking.ImpossibleDateBooking; 
        }

        this.db
            .get('bookings')
            .push(booking.toJson())
            .write();
    
    }

    getAll() {
        return this.db
            .get('bookings')
            .value();
    }

    getBookingsForId(id, allBookings) {
        const bookings = new Array();

        for (let i of allBookings) {
            if (i.jetpack_id == id) {
                bookings.push(i);
            }
        }
        return bookings;
    }

    isPossibleBooking(booking) {
        const allBookings = this.getAll();
        const filteredBookings = this.getBookingsForId(booking.jetpack_id, allBookings);

        if (filteredBookings.length === 0) {
            return true;
        } else {
            for (let i of filteredBookings) {
                if (this.areDatesOverlapping(booking.toJson(), i)){
                    return false;
                }
            }
            return true;
        }
    }
}; 
