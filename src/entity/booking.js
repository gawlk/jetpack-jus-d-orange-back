export const ErrorMessage = {
    MissingArgument: 'ERROR: Need a jetpack id, a starting date and an end date.',
    WrongEndDate: 'ERROR: The date of the end of the reservation must be set on the same or on a later date than the starting one.',
    WrongType: 'ERROR: jetpack_id should be a string and dates should be.. dates.',
    PastDate: 'ERROR: You can\'t book jetpack in the past',  
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
        } else if (end_date < start_date) {
            throw ErrorMessage.WrongEndDate;
        } else if (start_date < Date.now()) {
            throw ErrorMessage.PastDate; 
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

    get end_date() {
        return this._end_date;
    }

    toJson() {
        return {
            jetpack_id : this.jetpack_id,
            start_date: this.start_date.toISOString(),
            end_date: this.end_date.toISOString(),
        };
    }
};
