import { Router } from 'express';
import ConnectionsController from '../controller/ConnectionsController';

export default Router()
  .get('/', ConnectionsController.index)
  .post('/', ConnectionsController.create);
