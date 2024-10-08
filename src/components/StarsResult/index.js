import React, { useState } from 'react';
import key from '../../assets/images/key.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

const StarsResult = ({onScore}) => {
//   const [score, setScore] = useState(3.5);

  return (
    <div className="star-key-box">
        <div className="key-wrapper">
            <img className="key" src={key} alt="key" />
        </div>
        <div className="stars">
          <FontAwesomeIcon icon={onScore >= 80 ? solidStar : regularStar} size="xl" />
          <FontAwesomeIcon icon={regularStar} size="xl" />
          <FontAwesomeIcon icon={regularStar} size="xl" />
        </div>
    </div>
  );
};

export default StarsResult;
