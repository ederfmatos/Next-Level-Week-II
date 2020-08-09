import React from 'react';
import { PageHeader, Input, Textarea, Select } from '../../components';
import warningIcon from '../../assets/images/icons/warning.svg';
import subject from '../../constants/subject';

import './styles.css';
import { WeekDays } from '../../constants';

export default function TeacherForm() {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>

          <Input name="name" label="Nome completo" />
          <Input name="whatsapp" label="Avatar" />
          <Input name="name" label="Whatsapp" />

          <Textarea name="bio" label="Biografia" />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select name="subject" label="Matéria" options={subject} />
          <Input name="cost" label="Custo da sua hora por aula" />
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button">+ Novo Horário</button>
          </legend>

          <ul>
            <li className="schedule-item">
              <Select
                name="week_day"
                label="Dia da semana"
                options={WeekDays}
              />

              <Input name="from" label="Das" type="time" />
              <Input name="to" label="Até" type="time" />
            </li>
          </ul>
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Icone de aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>

          <button type="button">Salvar cadastro</button>
        </footer>
      </main>
    </div>
  );
}
