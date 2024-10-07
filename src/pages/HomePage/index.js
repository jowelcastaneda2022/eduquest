import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

function HomePage() {
  return (
    <div className="home-page">
      <div className="content">
        <h1>
          <span>The</span>
          <span>Lost Keys</span>
          <span>of</span>
          <span>Inventa Island</span>
        </h1>
        <p>An Interactive educational quest that will test your Math, Reading, Science and History!</p>
        <p>Age 8-12 years</p>
        <Link to="/welcome">Start new</Link>
      </div>
    </div>
  );
}

export default HomePage;