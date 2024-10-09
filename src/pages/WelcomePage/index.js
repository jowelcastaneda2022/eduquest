import React from 'react';
import { Link } from 'react-router-dom';
import owl from '../../assets/images/owl-welcome.png'
import './style.scss';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="content">
        <div className="img-wrapper">
          <img className="owl" src={owl} alt="owl" />
        </div>
        <h1>Welcome to Inventa Island</h1>
        <p>The land of Inventa Island was once nourished by the Crystal of Knowledge, a powerful artifact said to ensure harmony by nurturing wisdom and learning. Dr. Veilmind, blinded by his desire for control, unleashed a curse that</p>
        <div className="btn-wrapper"><Link to="/game-map" className="btn-style ">Next</Link></div>
      </div>
    </div>
  );
}

export default WelcomePage;