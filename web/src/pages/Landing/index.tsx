import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services.api';

export default function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  const loadTotalConnections = useCallback(async () => {
    const { data } = await api.get('/connections');
    setTotalConnections(data.total);
  }, []);

  useEffect(() => {
    loadTotalConnections();
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo do proffy" />
          <h2>Sua plataforma de estudos online</h2>
        </div>

        <img src={landing} alt="Plataforma de estudos" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            <span>Estudar</span>
          </Link>

          <Link to="give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            <span>Dar aulas</span>
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
}
