import { db } from './db';
import { JetpackRepository, BookingRepository } from './repository';
import {Jetpack} from './entity'; 

const repository = new JetpackRepository(db);
const toCheck = repository.getAll(); 

// const check = repoBook.existsJetpack('bonsoir', test); 


console.log('-----------------------------------------------------------------'); 

// console.log(test); 

console.log('-----------------------------------------------------------------'); 
// 
// console.log(check);

// const jet = new Jetpack('ghdfhudfh', 'dfkgk', 'sdgbjxgbkdjg');
// repository.create(jet); 
// const dummy = repository.getAll(); 
const test = repository.getById('48f3c314-75c7-4202-be2e-1b574235287b');
console.log(test); 



// const bookings = repository.getAll();

// const bookingsOfId = repository.getBookingsForId('48f3c314-75c7-4202-be2e-1b574235287b', bookings);
// 
// const booking = new Booking('coucou', new Date('2022-12-27'), new Date('2022-12-30'));
// const test = repository.create(booking); 
// const test = repository.existsJetpack('48f3c314-75c7-4202-be2e-1b574235287b'); 
// console.log(bookings.length); 
// console.log(bookingsOfId.length);
// console.log(bookingsOfId);
// console.log(test); 







//     getBookingsForId(id, allBookings) {
//       return allBookings.filter(value => value.id === id); 
//     }
 
