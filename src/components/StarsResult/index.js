import React from 'react';
import key from '../../assets/images/Inventa-island-key.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

const StarsResult = ({ percentage, gameNumber }) => {
  return (
    <div className="star-key-box">
      <div className="key-wrapper">
      {percentage > 89
        ? <img className="key" src={key} alt="key" />
        : <div className="number">{gameNumber}</div>
      }
      </div>
      <div className="stars">
        <FontAwesomeIcon
          icon={percentage > 1 ? solidStar : regularStar}
          size="xl"
        />

        <FontAwesomeIcon
          icon={percentage > 30 ? solidStar : regularStar}
          size="xl"
        />

        <FontAwesomeIcon
          icon={percentage > 89 ? solidStar : regularStar}
          size="xl"
        />
      </div>
    </div>
  );
};


export default StarsResult;
