import express, { Express } from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.routes();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App();