import { db } from './db';
import { BookingRepository } from './repository';
import { Booking } from './entity';

const repository = new BookingRepository(db);
// const bookings = repository.getAll();

// const bookingsOfId = repository.getBookingsForId('48f3c314-75c7-4202-be2e-1b574235287b', bookings);
// 
const booking = new Booking('coucou', new Date('2022-12-27'), new Date('2022-12-30'));
repository.create(booking); 
// const test = repository.create(booking); 
// const test = repository.existsJetpack('48f3c314-75c7-4202-be2e-1b574235287b'); 
// console.log(bookings.length); 
// console.log(bookingsOfId.length);
// console.log(bookingsOfId);
// console.log(test); 







//     getBookingsForId(id, allBookings) {
//       return allBookings.filter(value => value.id === id); 
//     }
