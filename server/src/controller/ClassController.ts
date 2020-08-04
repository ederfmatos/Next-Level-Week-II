import { Request, Response } from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

class ClassController {
  async store(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id: insertedUsersIds[0],
      });

      const classSchedule = schedule.map((item: ScheduleItem) => ({
        week_day: item.week_day,
        from: convertHoursToMinutes(item.from),
        to: convertHoursToMinutes(item.to),
        class_id: insertedClassesId[0],
      }));

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();
      return response.status(201).send();
    } catch (error) {
      console.log(error);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class',
      });
    }
  }
}

export default new ClassController();
