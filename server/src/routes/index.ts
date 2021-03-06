import { Router } from 'express';

import classRouter from './class.routes';
import connectionsRouter from './connections.routes';

const routes = Router();

routes.use('/classes', classRouter);
routes.use('/connections', connectionsRouter);

export default routes;
