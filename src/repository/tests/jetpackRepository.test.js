import {
    ErrorMessage,
    JetpackRepository
} from '../jetpackRepository';
import { Jetpack } from '../../entity';
import { defaultJetpack } from '../../db';
import { BookingRepository } from '../bookingRepository';

describe('JetpackRepository', () => {
    describe('constructor', () => {
        test('() => Missing database', () => {
            expect(() => new JetpackRepository()).toThrow(ErrorMessage.MissingDatabase);
        });
    });

    describe('create', () => {
        const db = {
            get: jest.fn().mockReturnThis(),
            push: jest.fn().mockReturnThis(),
            write: jest.fn().mockReturnThis(),
        };

        const repository = new JetpackRepository(db);

        test('() => Missing jetpack', () => {
            expect(() => repository.create()).toThrow(ErrorMessage.MissingJetpack);
        });

        test('(! jetpack) => Wrong type', () => {
            expect(() => repository.create(1)).toThrow(ErrorMessage.WrongTypeJetpack);
            expect(() => repository.create("test")).toThrow(ErrorMessage.WrongTypeJetpack);
            expect(() => repository.create({})).toThrow(ErrorMessage.WrongTypeJetpack);
        });

        test('(jetpack) => Ok', () => {
            repository.create(new Jetpack(
                defaultJetpack.id,
                defaultJetpack.name,
                defaultJetpack.image
            ));
            expect(db.write.mock.calls.length).toBe(1);
        });
    });

    describe('getAll', () => {
        test('[] => []', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getAll()).toStrictEqual([]);
        });

        test('[ defaultJetpack ] => [ defaultJetpack ]', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getAll()).toStrictEqual([ defaultJetpack ]);
        });
    });

    describe('getAvailable', () => {
        test('() => new Booking throw', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const repository = new JetpackRepository(db);
            expect(() => repository.getAvailable()).toThrow();
        });

        test('(date) => new Booking throw', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const date1 = new Date('2019-11-30');

            const repository = new JetpackRepository(db);
            expect(() => repository.getAvailable(date1)).toThrow();
        });

        test('(date, not date) => new Booking throw', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const date1 = new Date('2019-11-30');

            const repository = new JetpackRepository(db);
            expect(() => repository.getAvailable(date1, 1)).toThrow();
        });

        test('(not date, date) => new Booking throw', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const date1 = new Date('2019-11-30');

            const repository = new JetpackRepository(db);
            expect(() => repository.getAvailable(1, date1)).toThrow();
        });

        test('(date, date) => Ok', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07');

            const repository = new JetpackRepository(db);
            repository.getAvailable(date1, date2);
        });

        test('none booked => whole list', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            BookingRepository.prototype.isPossibleBooking = jest.fn().mockImplementation(() => true);
           
            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07');
            
            const repository = new JetpackRepository(db);
            expect(repository.getAvailable(date1, date2)).toStrictEqual([defaultJetpack]);
        });

        test('all booked => empty list', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            BookingRepository.prototype.isPossibleBooking = jest.fn().mockImplementation(() => false);
           
            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07'); 
            
            const repository = new JetpackRepository(db);
            expect(repository.getAvailable(date1, date2)).toStrictEqual([]);
        });
    
        test('no jetpacks => no bookings available', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            BookingRepository.prototype.isPossibleBooking = jest.fn().mockImplementation(() => true);
           
            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07'); 
            
            const repository = new JetpackRepository(db);
            expect(repository.getAvailable(date1, date2)).toStrictEqual([]);
        });
    });

    describe('getById ', () => {
        test('() => Missing ID', () => {
            const db = {};
            const repository = new JetpackRepository(db);
            expect(() => repository.getById()).toThrow(ErrorMessage.MissingId);
        });

        test('jetpack present => Ok', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getById('48f3c314-75c7-4202-be2e-1b574235287b')).toStrictEqual(defaultJetpack);
        });

        test('jetpack not present => Undefined ID', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };
            
            const repository = new JetpackRepository(db);
            
            expect(() => repository.getById('test')).toThrow(ErrorMessage.UndefinedID);
        });

        test('empty list => Undefined ID', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            const repository = new JetpackRepository(db);
            expect(() => repository.getById('48f3c314-75c7-4202-be2e-1b574235287b')).toThrow(ErrorMessage.UndefinedID);
        });
    });

    describe('getIdList', () => {
        test('[] => []', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getIdList()).toStrictEqual([]);
        });

        test('[ defaultJetpack ] => [ defaultJetpack.id ]', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getIdList()).toStrictEqual([ defaultJetpack.id ]);
        });
    });

    describe('update', () => {
        const db = {
            assign: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            get: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([ defaultJetpack ]),
            write: jest.fn().mockReturnThis(),
        };

        const repository = new JetpackRepository(db);

        test('() => Missing jetpack', () => {
            expect(() => repository.update()).toThrow(ErrorMessage.MissingJetpack);
        });

        test('(! jetpack) => Wrong type', () => {
            expect(() => repository.update(2)).toThrow(ErrorMessage.WrongTypeJetpack);
            expect(() => repository.update("test2")).toThrow(ErrorMessage.WrongTypeJetpack);
            expect(() => repository.update({})).toThrow(ErrorMessage.WrongTypeJetpack);
        });

        test('(fake jetpack) => Undefined id', () => {
            expect(() => repository.update(new Jetpack('test', 'test2', 'https://gamepedia.cursecdn.com/fortnite_gamepedia/e/e1/Jetpack_icon.png'))).toThrow(ErrorMessage.UndefinedID);
        });

        test('(jetpack) => Ok', () => {
            repository.update(new Jetpack(
                defaultJetpack.id,
                defaultJetpack.name,
                defaultJetpack.image
            ));
            expect(db.write.mock.calls.length).toBe(1);
        });
    });
});

