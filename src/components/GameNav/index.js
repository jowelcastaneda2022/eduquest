import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const GameNav = ({path, onButtonClick}) => {
    return (
      <div className='game-nav-links'>
        <Link className="home-link" to={path ? path : '/game-map'}>
            <span className="text">Home</span>
        </Link>
        <Link className="back-link" to={path ? path : '/'}>
            <span className="text">&lt; &nbsp; Back</span>
        </Link>
        <a className="help-link" onClick={onButtonClick}>
            <span className="text">Help</span>
        </a>
      </div>
    );
  };
  
export default GameNav;