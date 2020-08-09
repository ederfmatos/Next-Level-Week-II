import React, { useCallback, FormEvent, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { PageHeader, Input, Select } from '../../components';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Subjects, WeekDays } from '../../constants';
import api from '../../services.api';
import './styles.css';

interface FilterProps {
  week_day: number;
  subject: string;
  time: string;
}

export default function TeacherList() {
  const [teacherItems, setTeacherItems] = useState([]);
  const formik = useFormik<FilterProps>({
    initialValues: {
      week_day: 0,
      subject: '',
      time: '',
    },
    onSubmit: () => {},
  });

  const searchTeachers = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        const { data } = await api.get('/classes', {
          params: formik.values,
        });

        setTeacherItems(data);
      } catch (error) {
        toast.error('Ocorreu um erro ao buscar professores');
      }
    },
    [formik.values],
  );

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            options={Subjects}
            onChange={formik.handleChange}
            value={formik.values.subject}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            options={WeekDays}
            onChange={formik.handleChange}
            value={formik.values.week_day}
          />

          <Input
            name="time"
            label="Hora"
            type="time"
            onChange={formik.handleChange}
            value={formik.values.time}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teacherItems.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}
