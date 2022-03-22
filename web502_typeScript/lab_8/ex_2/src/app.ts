import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { json } from 'body-parser';
import * as controller from './controller';

const app = express();

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.use('/route', router);
router.get('/', (request, response) => { //route/index
  response.send('Hello world Route with Nodemon 1!');
});
router.get('/users', controller.users);
router.post('/user/create', controller.create);