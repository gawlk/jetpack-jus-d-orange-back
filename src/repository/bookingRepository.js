import { ErrorMessage,JetpackRepository } from './jetpackRepository';
import { Jetpack } from '../entity';




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

    create(booking) {
        if (! booking) {
            throw ErrorMessageBooking.MissingBooking;
        }

        if (booking.constructor.name !== 'Booking') {
            throw ErrorMessageBooking.WrongTypeBooking;
        }
//         if (! this.existsJetpack(booking.jetpack_id)) {
//          throw ErrorMessageBooking.NoJetPackWithId; 
//         }
            
        if (!this.isPossibleBooking(booking)) {
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
    
//     existsJetpack(jetpack_id) {
//         const jetpackRepo = new JetpackRepository(this.db);
//         const allJetpacks = jetpackRepo.getAll(); 
//         for (let i of allJetpacks) {
//             if(i.id == jetpack_id) {
//                 return true;
//             }
//         }
//         return false; 
//     } 
    areDatesOverlapping(booking, bookingObject) {
        
        return (booking.end_date > new Date(bookingObject.start_date) && booking.start_date < new Date(bookingObject.start_date)) 
                || (booking.start_date >= new Date(bookingObject.start_date) && booking.end_date <= new Date(bookingObject.end_date))
                || (booking.start_date < new Date(bookingObject.end_date) && booking.end_date > new Date(bookingObject.end_date))
    }
}; 
