import { Router } from 'express';
import ClassController from '../controller/ClassController';

const classRouter = Router();

classRouter.post('/', ClassController.store);

export default classRouter;
