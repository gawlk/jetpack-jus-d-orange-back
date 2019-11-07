import express from 'express';
import bodyParser from 'body-parser';

import { getJetpackController } from './src/controller/getJetpackController';
import { createJetpackController } from './src/controller/createJetpackController';
import { updateJetpackController } from './src/controller/updateJetpackController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.route('/jetpacks/update')
	.post(updateJetpackController);

app.route('/jetpacks/:id?')
    .get(getJetpackController)
    .post(createJetpackController);


app.listen(3000, function () {
    console.log('Jetpack back end server started on port 3000.');
});
