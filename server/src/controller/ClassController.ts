import { Request, Response } from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

class ClassController {
  async index(request: Request, response: Response) {
    const week_day = request.query.week_day as string;
    const subject = request.query.subject as string;
    const time = request.query.time as string;

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHoursToMinutes(time);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.send(classes);
  }

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
