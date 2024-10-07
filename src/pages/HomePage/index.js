import React from 'react';
import { AnimatedBg, GameLink, LogoIcon } from '../../components';
import homeBgLogo from '../../assets/images/home-bg.png'
import './style.scss'

function HomePage() {
  return (
    <div className="home-page">
      <img className="home-bg" src={homeBgLogo} alt="EDUQUEST" />
      <div className="content">
        {/* <LogoIcon /> */}
        <h1>The <span class="large">Lost Keys</span> <span class="small">of</span> Inventa Island</h1>
        <p>An Interactive educational quest that will test your Math, Reading, Science and History!</p>
        <p>Age 8-12 years</p>
      </div>
      <button class="start-game">Start Game</button>
    </div>
  );
}

export default HomePage;