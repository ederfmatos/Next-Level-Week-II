import { Router } from 'express';
import ClassController from '../controller/ClassController';

export default Router()
  .get('/', ClassController.index)
  .post('/', ClassController.store);
