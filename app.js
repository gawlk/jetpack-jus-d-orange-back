import express from 'express';
import bodyParser from 'body-parser';

import {
    createBookingController,
    createJetpackController,
    getJetpackController,
} from './src/controller';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.route('/jetpacks/:id?')
    .get(getJetpackController)
    .post(createJetpackController);

app.route('/bookings')
    .post(createBookingController);

app.listen(3000, function () {
    console.log('Jetpack back end server started on port 3000.');
});
