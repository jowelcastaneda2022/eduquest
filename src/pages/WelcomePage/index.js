import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="content">
        <h1>Welcome to Inventa Island</h1>
        <p>The land of Inventa Island was once nourished by the Crystal of Knowledge, a powerful artifact said to ensure harmony by nurturing wisdom and learning. Dr. Veilmind, blinded by his desire for control, unleashed a curse that</p>
        <Link to="/game-map">Next</Link>
      </div>
    </div>
  );
}

export default WelcomePage;