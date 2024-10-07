import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

function HowToPage({ title, description, link }) {
  return (
    <div className="welcome-page">
      <div className="content">
        <h1>{title ? title : 'How to play'}</h1>
        <p>{description ? description : 'Description here...'}</p>
        <Link to="/game-map">Close</Link>
      </div>
    </div>
  );
}

export default HowToPage;