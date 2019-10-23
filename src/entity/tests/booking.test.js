import {
    Booking,
    ErrorMessage,
} from '../booking';

describe('Booking', () => {
    describe('constructor', () => {
        test('() => Missing argument', () => {
            expect(() => new Booking()).toThrow(ErrorMessage.MissingArgument);
        });

        test('(string) => Missing argument', () => {
            expect(() => new Booking('id')).toThrow(ErrorMessage.MissingArgument);
        });
        
        const date1 = new Date('December 17, 1995 03:24:00');

        test('(string, date) => Missing argument', () => {
            expect(() => new Booking('id', date1)).toThrow(ErrorMessage.MissingArgument);
        });

        const date2 = new Date('December 17, 1996 03:24:00');

        test('(string, date, date) => Ok', () => {
            new Booking('id', date1, date2);
        });

        test('(!string, date, date) => Wrong type', () => {
            expect(() => new Booking(1, date1, date2)).toThrow(ErrorMessage.WrongType);
        });

        test('(string, !date, date) => Wrong type', () => {
            expect(() => new Booking('id', 1, date2)).toThrow(ErrorMessage.WrongType);
        });

        test('(string, date, !date) => Wrong type', () => {
            expect(() => new Booking('id', date1, 1)).toThrow(ErrorMessage.WrongType);
        });

        test('(id, dateEnd, dateStart) => Wrong end date', () => {
            expect(() => new Booking('id', date2, date1)).toThrow(ErrorMessage.WrongEndDate);
        });

        test('(id, dateStart, dateStart) => Ok', () => {
            new Booking('id', date1, date1);
        });
    });

    describe('toJson', () => {
        test(`("id", new Date(2013, 0, 1), new Date(2013, 0, 2)) => {
            jetpack_id: "id",
            start_date: "Tue Jan 01 2013",
            end_date: "Wed Jan 02 2013"
        }`, () => {
            const jetpack_id = 'id';
            const start_date = new Date(2013, 0, 1);
            const end_date = new Date(2013, 0, 2);

            const booking = new Booking(jetpack_id, start_date, end_date);

            expect(booking.toJson()).toMatchObject({
                jetpack_id,
                start_date: start_date.toDateString(),
                end_date: end_date.toDateString(),
            })
        });
    });
});
