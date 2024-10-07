import React from 'react';
import { Link } from 'react-router-dom';
import homeBgLogo from '../../assets/images/home-bg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

function MapPage() {
  const challenges = [
    {
      text: "Math Mountain",
      path: "/math-mountain"
    },
    {
      text: "Scramble Savannah",
      path: "/scramble-savannah"
    },
    {
      text: "Spellbound Sands",
      path: "/spellbound-sands"
    },
    {
      text: "Flipstone Falls",
      path: "/flipstone-falls"
    }
  ];

  return (
    <div className="map-page">
      <img className="home-bg" src={homeBgLogo} alt="Map" />
      <div className="content">
        <h1>Select your learning adventure!</h1>
        <ul>
          {challenges.map((challenge, index) => (
            <li key={index}>
              <Link to={challenge.path} className="challenges-link">
              <div className="name">
                  {challenge.text}
              </div>
              <div className="score">
                <div className="circle">
                  <div>{index+1}</div>
                </div>
                <div className="stars">
                  <FontAwesomeIcon icon={faStar} size="xl" />
                  <FontAwesomeIcon icon={faStar} size="xl" />
                  <FontAwesomeIcon icon={faStar} size="xl" />
                </div>
              </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapPage;
