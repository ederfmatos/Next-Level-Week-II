import { Request, Response } from 'express';
import db from '../database/connection';

class ConnectionsController {
  async index(request: Request, response: Response) {
    const [{ total }] = await db('connections').count('* as total');
    return response.json({ total });
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await db('connections').insert({
      user_id,
    });

    return response.status(201).send();
  }
}

export default new ConnectionsController();
