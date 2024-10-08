import React from 'react';
import { Link } from 'react-router-dom';
import owl from '../../assets/images/owl-welcome.png'
import './style.scss'

function HowToPage({ title, description, link }) {
  return (
    <div className="howto-page">
      <div className="content">
        <div class="img-wrapper">
          <img className="owl" src={owl} alt="owl" />
        </div>
        <h1>{title ? title : 'How to play'}</h1>
        <p>{description ? description : "In Guess It, Spell It, your goal is to identify the object shown in the picture. Below the image, there’s a blank square representing the hidden name of the object. Beneath that, you'll find a set of scrambled letters. Your task is to choose the correct letters from the scrambled ones to spell out the object’s name and complete the challenge. Have fun guessing and spelling!"}</p>
        <div class="btn-wrapper"><Link to="/game-map" class="btn-style">Close</Link></div>
      </div>
    </div>
  );
}

export default HowToPage;