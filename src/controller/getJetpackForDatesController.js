import { db } from '../db';
import { JetpackRepository } from '../repository';


export const getJetpackForDatesController = (req, res) => {
    
     const date1 = new Date(req.body.start_date);
     const date2 = new Date(req.body.end_date);
    
    
    const repository = new JetpackRepository(db);

    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send(repository.getAvailable(date1, date2));
};
 
