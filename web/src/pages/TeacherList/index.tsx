import React from 'react';
import { PageHeader, Input, Select } from '../../components';

import './styles.css';
import TeacherItem from '../../components/TeacherItem';
import { Subjects, WeekDays } from '../../constants';

export default function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers">
          <Select name="subject" label="Matéria" options={Subjects} />
          <Select name="week_day" label="Dia da semana" options={WeekDays} />
          <Input name="time" label="Hora" type="time" />
        </form>
      </PageHeader>

      <main>
        <TeacherItem />
      </main>
    </div>
  );
}
