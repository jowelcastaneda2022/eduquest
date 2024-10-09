import React from 'react';
import { Link } from 'react-router-dom';
import homeBgLogo from '../../assets/images/home-bg.png'
import './style.scss'

function HomePage() {
  return (
    <div className="home-page">
      <img className="home-bg" src={homeBgLogo} alt="Map" />
      <div className="content">
        <h1>
          <span>The</span>
          <span className="text-large">Lost Keys</span>
          <span className="text-small">of</span>
          <span>Inventa Island</span>
        </h1>
        <p>An Interactive educational quest that will test your Math,<br/> Reading, Science and History!</p>
        <p className="pt-md">Age 8-12 years</p>
        <div className="btn-wrapper"><Link to="/welcome">Start new</Link></div>
      
      </div>
    </div>
  );
}

export default HomePage;