import React from 'react';
import { Link } from 'react-router-dom';
import welcomeTitle from '../../assets/images/welcome-title.png'
import './style.scss'

function HomePage() {
  return (
    <div className="home-page">
      <img className="home-title" src={welcomeTitle} alt="Map" />
      <div className="content">
        <p>An Interactive educational quest that will test <br/>your Math, Reading, Science and History!</p>
        <p className="pt-md">Age 8-12 years</p>
        <div className="btn-wrapper"><Link to="/welcome">Start new</Link></div>
      </div>
    </div>
  );
}

export default HomePage;