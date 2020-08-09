import React, { useCallback, FormEvent } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { PageHeader, Input, Textarea, Select } from '../../components';
import warningIcon from '../../assets/images/icons/warning.svg';
import subject from '../../constants/subject';
import { toast } from 'react-toastify';

import './styles.css';
import { WeekDays } from '../../constants';
import api from '../../services.api';

interface TeacherProps {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
  scheduleItems: Array<{
    week_day: number;
    from: string;
    to: string;
  }>;
}

const teacherValidationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  avatar: Yup.string().required('O avatar é obrigatório'),
  whatsapp: Yup.string().required('O whatsapp é obrigatório'),
  bio: Yup.string().required('A biografia é obrigatória'),
  subject: Yup.string().required('A matéria é obrigatória'),
  cost: Yup.number()
    .min(1, 'O valor mínimo de uma aula é de R$ 1,00')
    .required('O valor da aula é obrigatório'),
  scheduleItems: Yup.array().required('Adicione ao menos 1 horário de aula'),
});

export default function TeacherForm() {
  const history = useHistory();

  const formik = useFormik<TeacherProps>({
    initialValues: {
      name: '',
      avatar: '',
      whatsapp: '',
      bio: '',
      subject: '',
      cost: 0.0,
      scheduleItems: [],
    },
    onSubmit: () => {},
  });

  const addNewScheduleItem = useCallback(() => {
    formik.setFieldValue('scheduleItems', [
      ...formik.values.scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
      },
    ]);
  }, [formik]);

  const setScheduleItemValue = useCallback(
    (index, event) => {
      formik.setFieldValue(
        'scheduleItems',
        formik.values.scheduleItems.map((scheduleItem, i) =>
          index !== i
            ? scheduleItem
            : {
                ...scheduleItem,
                [event.target.name]: event.target.value,
              },
        ),
      );
    },
    [formik],
  );

  const register = useCallback(async teacherModel => {
    try {
      await api.post('/classes', {
        name: teacherModel.name,
        avatar: teacherModel.avatar,
        whatsapp: teacherModel.whatsapp,
        bio: teacherModel.bio,
        subject: teacherModel.subject,
        cost: Number(teacherModel.cost),
        schedule: teacherModel.scheduleItems,
      });
      toast.success('Cadastro efetuado com sucesso');
      setTimeout(() => history.push('/'), 2000);
    } catch (error) {
      toast.error('Erro ao realizar cadastro');
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      teacherValidationSchema
        .validate(formik.values)
        .then(teacherModel => register(teacherModel))
        .catch(({ message }) => toast.error(message));
    },
    [formik.values, register],
  );

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
            />

            <Input
              name="avatar"
              label="Avatar"
              onChange={formik.handleChange}
              value={formik.values.avatar}
              required
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              onChange={formik.handleChange}
              value={formik.values.whatsapp}
              required
            />

            <Textarea
              name="bio"
              label="Biografia"
              onChange={formik.handleChange}
              value={formik.values.bio}
              required
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              options={subject}
              onChange={formik.handleChange}
              value={formik.values.subject}
              required
            />

            <Input
              name="cost"
              label="Custo da sua hora por aula"
              onChange={formik.handleChange}
              value={formik.values.cost}
              required
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>

            <ul>
              {formik.values.scheduleItems.map((scheduleItem, index) => (
                <li key={`schedule-item-${index}`} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    options={WeekDays}
                    onChange={event => setScheduleItemValue(index, event)}
                    value={scheduleItem.week_day}
                    required
                  />

                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    onChange={event => setScheduleItemValue(index, event)}
                    required
                    value={scheduleItem.from}
                  />

                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    onChange={event => setScheduleItemValue(index, event)}
                    required
                    value={scheduleItem.to}
                  />
                </li>
              ))}
            </ul>
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Icone de aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
