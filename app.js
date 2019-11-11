import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {
    createBookingController,
    createJetpackController,
    getBookingController,
    getJetpackController,
    updateJetpackController,
} from './src/controller';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.route('/jetpacks/update')
    .post(updateJetpackController);

app.route('/jetpacks/:id?')
    .get(getJetpackController)
    .post(createJetpackController);

app.route('/bookings')
    .get(getBookingController)
    .post(createBookingController);

app.listen(3000, function () {
    console.log('Jetpack back end server started on port 3000.');
});
