import { db } from '../db';
import { JetpackRepository } from '../repository';

export const ErrorMessage = {
    WrongEndDate: 'ERROR: The date of the end of the reservation must be set on the same or on a later date than the starting one.',
    PastDate: 'ERROR: You can\'t book jetpack in the past',  
}


export const getJetpackForDatesController = (req, res) => {
    
     const date1 = new Date(req.body.start_date);
     const date2 = new Date(req.body.end_date);
    
    if (end_date < start_date) {
            throw ErrorMessage.WrongEndDate;
        }
    if(start_date < Date.now()) {
            throw ErrorMessage.PastDate; 
        }
    
    const repository = new JetpackRepository(db);

    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send(repository.getAvailable(date1, date2));
};
 
