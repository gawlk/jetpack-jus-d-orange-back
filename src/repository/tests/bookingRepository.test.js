import { ErrorMessageBooking, BookingRepository } from '../bookingRepository';
import { JetpackRepository } from '../jetpackRepository';
import { Booking } from '../../entity';
import { defaultJetpack } from '../../db';

describe('BookingRepository', () => {
    describe('constructor', () => {
        test('() => Missing database', () => {
            expect(() => new BookingRepository()).toThrow(ErrorMessageBooking.MissingDatabase);
        });
    });
    
    describe('create', () => {
        const bookingTest = new Booking(defaultJetpack.id,
            new Date('2020-07-06'),
            new Date('2020-07-30'));

        const bookingTestOverLeft = new Booking(defaultJetpack.id,
            new Date('2020-07-01'),
            new Date('2020-07-07'));

        const bookingTestOverRight = new Booking(defaultJetpack.id,
            new Date('2020-07-28'),
            new Date('2020-08-07'));

        const bookingTestEquals = new Booking(defaultJetpack.id,
            new Date('2020-07-06'),
            new Date('2020-07-30'));

        const bookingTestLonger = new Booking(defaultJetpack.id,
            new Date('2020-07-01'),
            new Date('2020-08-03')); 

        const bookingTestShorter = new Booking(defaultJetpack.id,
            new Date('2020-07-10'),
            new Date('2020-07-20'));

        const bookingTestSameLeftShorter = new Booking(defaultJetpack.id,
            new Date('2020-07-06'),
            new Date('2020-07-20'));

        const bookingTestSameLeftLonger = new Booking(defaultJetpack.id,
            new Date('2020-07-06'),
            new Date('2020-08-20'));

        const bookingTestSameRightShorter = new Booking(defaultJetpack.id,
            new Date('2020-07-20'),
            new Date('2020-07-30'));

        const bookingTestSameRightLonger = new Booking(defaultJetpack.id,
            new Date('2020-07-01'),
            new Date('2020-07-30'));

        const nonOverBookingLeft = new Booking(defaultJetpack.id,
            new Date('2020-07-03'),
            new Date('2020-07-05'));

        const nonOverBookingRight = new Booking(defaultJetpack.id,
            new Date('2020-09-10'),
            new Date('2020-09-20'));

        const notBookedJetpack = new Booking('48f3c314-75c7-4202-be2e-1b574235287c',
            new Date('2020-07-10'),
            new Date('2020-07-20'));

        const db = {
            get: jest.fn().mockReturnThis(),
            push: jest.fn().mockReturnThis(),
            write: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([ bookingTest.toJson() ]),
        };

        JetpackRepository.prototype.getById = jest.fn().mockImplementation(() => true);

        const repository = new BookingRepository(db);

        test('() => Missing booking', () => {
            expect(() => repository.create()).toThrow(ErrorMessageBooking.MissingBooking);
        });

        test('(! booking) => Wrong type', () => {
            expect(() => repository.create(66)).toThrow(ErrorMessageBooking.WrongTypeBooking);
            expect(() => repository.create("not a booking")).toThrow(ErrorMessageBooking.WrongTypeBooking);
            expect(() => repository.create({})).toThrow(ErrorMessageBooking.WrongTypeBooking);
        });

        test('(! possibleBooking) => Impossible booking', () => {
            expect(() => repository.create(bookingTestOverLeft)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestOverRight)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestEquals)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestLonger)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestShorter)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestSameLeftShorter)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestSameLeftLonger)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestSameRightShorter)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
            expect(() => repository.create(bookingTestSameRightLonger)).toThrow(ErrorMessageBooking.ImpossibleDateBooking);
        });

        test('(possibleBooking) => OK booking dates', () => {
            expect(() => repository.isPossibleBooking(nonOverBooking).toBe(true));
            expect(() => repository.isPossibleBooking(notBookedJetpack).toBe(true));
        });

        test('(booking) => Ok create', () => {
            repository.create(nonOverBookingLeft);
            expect(db.write.mock.calls.length).toBe(1);

            repository.create(nonOverBookingRight);
            expect(db.write.mock.calls.length).toBe(2);

            repository.create(notBookedJetpack);
            expect(db.write.mock.calls.length).toBe(3);
        });
    });

    describe('getAll', () => {
        test(' returns mock booking ', () => {
            const bookingTest = new Booking(defaultJetpack.id, new Date('2020-07-06'), new Date('2020-07-30'));

            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([ bookingTest.toJson() ]),
            };

            const repository = new BookingRepository(db);
                expect(repository.getAll()).toStrictEqual([ bookingTest.toJson() ]);
        });


        test('db returns empty list', () => {
            const db = {
                get: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue([]),
            };
            const repository = new BookingRepository(db);
            expect(repository.getAll()).toStrictEqual([]);
        });
    });
});
