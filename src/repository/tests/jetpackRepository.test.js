import {
    ErrorMessage,
    JetpackRepository
} from '../jetpackRepository';
import { Jetpack } from '../../entity';
import { defaultJetpack } from '../../db';
import { ErrorMessageBooking, BookingRepository } from '../bookingRepository';

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
            repository.create(new Jetpack('test', 'test', 'test'));
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

    describe('update', () => {
        const db = {
            get: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            assign: jest.fn().mockReturnThis(),
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

        test('(jetpack) => Ok', () => {
            repository.update(new Jetpack('test', 'test2', 'test2'));
            expect(db.write.mock.calls.length).toBe(1);
        });
    });  
    describe('getIds', () => {
        test('[] => []', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getIdList()).toStrictEqual([]);
        });

        test('[ defaultJetpack ] => [ defaultJetpack ]', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            const repository = new JetpackRepository(db);

            expect(repository.getIdList()).toStrictEqual([ defaultJetpack.id ]);
        });
    });
    describe('getAvailable ok ', () => {
        test('() => jetpacks', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            BookingRepository.prototype.isPossibleBooking = jest.fn().mockImplementation((b) => true);
           
            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07'); 
            
            const repository = new JetpackRepository(db);
            expect(repository.getAvailable(date1, date2)).toStrictEqual([defaultJetpack]);
        
    });
                test('() => jetpacks', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ defaultJetpack ]),
            };

            BookingRepository.prototype.isPossibleBooking = jest.fn().mockImplementation((b) => false);
           
            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07'); 
            
            const repository = new JetpackRepository(db);
            expect(repository.getAvailable(date1, date2)).toStrictEqual([]);
        
    });
    test('() => jetpacks', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            BookingRepository.prototype.isPossibleBooking = jest.fn().mockImplementation((b) => true);
           
            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07'); 
            
            const repository = new JetpackRepository(db);
            expect(repository.getAvailable(date1, date2)).toStrictEqual([]);
        
    });
    test('() => jetpacks', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };

            BookingRepository.prototype.isPossibleBooking = jest.fn().mockImplementation((b) => false);
           
            const date1 = new Date('2019-11-30');
            const date2 = new Date('2019-12-07'); 
            
            const repository = new JetpackRepository(db);
            expect(repository.getAvailable(date1, date2)).toStrictEqual([]);
        
    });
    });

});

