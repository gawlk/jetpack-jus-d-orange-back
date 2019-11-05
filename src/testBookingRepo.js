import { db } from './db';
import { BookingRepository } from './repository';
import { Booking } from './entity';

const repository = new BookingRepository(db);
const bookings = repository.getAll();

const bookingsOfId = repository.getBookingsForId('48f3c314-75c7-4202-be2e-1b574235287b', bookings);

const booking = new Booking('48f3c314-75c7-4202-be2e-1b574235287b', new Date('2019-12-27'), new Date('2019-12-30'));

const test = repository.create(booking); 

// console.log(bookings.length); 
// console.log(bookingsOfId.length);
// console.log(bookingsOfId);
console.log(test); 







//     getBookingsForId(id, allBookings) {
//       return allBookings.filter(value => value.id === id); 
//     }
