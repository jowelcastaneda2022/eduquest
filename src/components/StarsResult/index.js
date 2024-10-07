import React, { useState } from 'react';
import { IconStarFill } from '../Stars';
import key from '../../assets/images/key.png';
import './style.scss'

const StarsResult = () => {
//   const [score, setScore] = useState(3.5);

  return (
    <div class="star-key-box">
        <div class="key-wrapper">
            <img className="key" src={key} alt="key" />
        </div>
        <div class="stars">
            <IconStarFill />
            <IconStarFill />
            <IconStarFill />
        </div>
    </div>
  );
};

export default StarsResult;
