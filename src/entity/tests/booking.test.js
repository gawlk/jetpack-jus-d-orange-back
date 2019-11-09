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

        const okDate1 = new Date('2022-12-27');
        const okDate2 = new Date('2022-12-30'); 
        
        test('(string, date) => Missing argument', () => {
            expect(() => new Booking('id', date1)).toThrow(ErrorMessage.MissingArgument);
        });

        const date2 = new Date('December 17, 1996 03:24:00');

        test('(string, date, date) => Past date', () => {
            expect(() => new Booking('id', date1, date2)).toThrow(ErrorMessage.PastDate);
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

        test('(id, dateStart, dateStart) => ok', () => {
            new Booking('id', okDate1, okDate1);
        });
    });

    describe('toJson', () => {
        test(`("id", new Date(2013, 0, 1), new Date(2013, 0, 2)) => {
            jetpack_id: "id",
            start_date: "2022-01-01",
            end_date: "2022-01-02"
        }`, () => {
            const jetpack_id = 'id';
            const start_date = new Date(2022, 0, 1);
            const end_date = new Date(2022, 0, 2);

            const booking = new Booking(jetpack_id, start_date, end_date);

            expect(booking.toJson()).toMatchObject({
                jetpack_id,
                start_date: start_date.toISOString().split('T')[0],
                end_date: end_date.toISOString().split('T')[0],
            })
        });
    });
});
