import { Router } from 'express';
import classRouter from './class.routes';

const routes = Router();

routes.use('/classes', classRouter);

export default routes;
