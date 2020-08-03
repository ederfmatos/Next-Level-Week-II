import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/34350634?s=460&u=0944410b12a53de8c311ee36e0e50fc147c1b83d&v=4"
          alt="Eder Matos"
        />

        <div>
          <strong>Eder Matos</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <footer>
        <p>
          Preço/hora <strong>R$ 95.00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Icone do whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
