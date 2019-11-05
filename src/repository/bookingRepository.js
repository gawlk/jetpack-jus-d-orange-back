export const ErrorMessage = {
    MissingDatabase: 'ERROR: db object is missing.',
    MissingBooking: 'ERROR: Bookings object is missing.',
    WrongTypeBooking: 'ERROR: The parameter must be a Booking object',
    ImpossibleDateBooking: 'ERROR : Jetpack already booked for those dates', 
}

export class BookingRepository {
    constructor(db) {
        if (! db) {
            throw ErrorMessage.MissingDatabase;
        }

        this.db = db;
    }

    create(booking) {
        if (! booking) {
            throw ErrorMessage.MissingJetpack;
        }

        if (booking.constructor.name !== 'Booking') {
            throw ErrorMessage.WrongTypeJetpack;
        }
        if (!this.isPossibleBooking(booking)) {
            throw ErrorMessage.ImpossibleDateBooking; 
        }

        this.db
            .get('bookings')
            .push(booking.toJson())
            .write();
        return 'all ok';
    }

    getAll() {
        return this.db
            .get('bookings')
            .value();
    }
    
    isPossibleBooking(booking) {
     const allBookings = this.getAll();
     const filteredBookings = this.getBookingsForId(booking.jetpack_id, allBookings); 
     if(filteredBookings.length === 0) {
         return true;}
     else {
         for(let i of filteredBookings) {
            if (this.areDatesOverlapping(booking, i)){
                return false; 
            } 
         }
         return true; 
     } 
     
    }
    
    getBookingsForId(id, allBookings) {
        let val = new Array(); 
        for (let i of allBookings) {
            if(i.jetpack_id == id) {
                val.push(i); 
            }
        }
        return val; 
    }
    
    areDatesOverlapping(booking, bookingObject) {
        
        return (booking.end_date > new Date(bookingObject.start_date) && booking.start_date < new Date(bookingObject.start_date)) 
                || (booking.start_date >= new Date(bookingObject.start_date) && booking.end_date <= new Date(bookingObject.end_date))
                || (booking.start_date < new Date(bookingObject.end_date) && booking.end_date > new Date(bookingObject.end_date))
    }
}; 
