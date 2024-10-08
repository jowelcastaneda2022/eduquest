import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';

const GameNav = ({path, onButtonClick}) => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };
  
    return (
      <div className='game-nav-links'>
        <Link className="home-link" to={path ? path : '/game-map'}>
            <span className="text">Home</span>
        </Link>
        <a className="back-link" onClick={handleBack}>
            <span className="text">&lt; &nbsp; Back</span>
        </a>
        <a className="help-link" onClick={onButtonClick}>
            <span className="text">Help</span>
        </a>
      </div>
    );
  };
  
export default GameNav;