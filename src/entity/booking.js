export const ErrorMessage = {
    MissingArgument: 'ERROR: Need a jetpack id, a starting date and an end date.',
    WrongEndDate: 'ERROR: The date of the end of the reservation must be set on the same or on a later date than the starting one.',
    WrongType: 'ERROR: jetpack_id should be a string and dates should be.. dates.',
}

export class Booking {
    constructor(jetpack_id, start_date, end_date) {
        if (! jetpack_id || ! start_date || ! end_date) {
            throw ErrorMessage.MissingArgument;
        } else if (
            typeof jetpack_id !== 'string'
            || start_date.constructor.name !== 'Date'
            || end_date.constructor.name !== 'Date'
        ) {
            throw ErrorMessage.WrongType;
        }

        // Convert dates to ignore hours, minutes and seconds
        start_date = new Date(start_date.toDateString());
        end_date = new Date(end_date.toDateString());
        
        if (end_date < start_date) {
            throw ErrorMessage.WrongEndDate;
        }

        this._jetpack_id = jetpack_id;
        this._start_date = start_date;
        this._end_date = end_date;
    }

    get jetpack_id() {
        return this._jetpack_id;
    }

    get start_date() {
        return this._start_date;
    }

    set start_date(value) {
        this._start_date = value;
    }

    get end_date() {
        return this._end_date;
    }

    set end_date(value) {
        this._end_date = value;
    }

    toJson() {
        return {
            jetpack_id : this.jetpack_id,
            start_date: this.start_date.toDateString(),
            end_date: this.end_date.toDateString(),
        };
    }
};
