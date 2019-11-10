import { ErrorMessageBooking,BookingRepository } from './bookingRepository';
import {Booking} from '../entity';

export const ErrorMessage = {
    MissingDatabase: 'ERROR: db object is missing.',
    MissingJetpack: 'ERROR: Jetpack object is missing.',
    WrongTypeJetpack: 'ERROR: The parameter must be a Jetpack object',
}

export class JetpackRepository {
    constructor(db) {
        if (! db) {
            throw ErrorMessage.MissingDatabase;
        }

        this.db = db;
    }

    create(jetpack) {
        if (! jetpack) {
            throw ErrorMessage.MissingJetpack;
        }

        if (jetpack.constructor.name !== 'Jetpack') {
            throw ErrorMessage.WrongTypeJetpack;
        }

        this.db
            .get('jetpacks')
            .push(jetpack.toJson())
            .write();
    }

    update(jetpack) {
        if (! jetpack) {
            throw ErrorMessage.MissingJetpack;
        }

        if (jetpack.constructor.name !== 'Jetpack') {
            throw ErrorMessage.WrongTypeJetpack;
        }
        this.db.get('jetpacks')
          .find({ id: jetpack.id })
          .assign({ name: jetpack.name },{ image: jetpack.image })
          .write()
    }

    getAll() {
        return this.db
            .get('jetpacks')
            .value();
    }
    
    getAvailable(date1, date2) {
        const bookingRepo = new BookingRepository(this.db); 
        const jetpacks = this.getAll(); 
        let result = new Array(); 
        for (let jetpack of jetpacks) {
            if (bookingRepo.isPossibleBooking(new Booking(jetpack.id, date1, date2))) {
                result.push(jetpack); 
            }
        }
        return result; 
    }
    getIdList() {
        const list = this.getAll(); 
        let result= new Array(); 
        for (let jetpack of list) {
            result.push(jetpack.id);
        }
        return result; 
    }
};
