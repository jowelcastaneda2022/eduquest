import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import owl from '../../assets/images/owl-welcome.png'
import './style.scss'
import { default as StarsResult } from '../StarsResult'

function GameModal({ description, link , onButtonClick, buttonText, type, title, header }) {
  return (
    <div className="howto-modal">
      <div className="content">
          {type === 'regular' ? (
            <div class="img-wrapper">
              <img className="owl" src={owl} alt="owl" />
            </div>
          ) : type === 'advance' ? (
            <div class="advance-wrapper">
              <p>{title ? title : ""}</p>
              <StarsResult />
            </div>
          ) : (
            <p>Choose Modal Type Please.</p>
          )}
        <h1>{header ? header : 'How to play'}</h1>
        <p>{description ? description : ""}</p>
        <div class="btn-wrapper"><a class="btn-style" onClick={onButtonClick}>{buttonText ? buttonText : 'Close'}</a></div>
      </div>
    </div>
  );
}

export default GameModal;