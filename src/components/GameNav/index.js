import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import helpIcon from '../../assets/images/inventa-help.png';
import homeIcon from '../../assets/images/inventa-home.png';
import backIcon from '../../assets/images/inventa-back.png';
import './style.scss';

const GameNav = ({ path, onButtonClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === '/game-map') {
      navigate('/game-map');
    } else {
      navigate(-1);
    }
  };

  const isOnGameMap = location.pathname === '/game-map';

  return (
    <div className='game-nav-links'>
      <Link className="home-link" to={path ? path : '/game-map'}>
      </Link>
      <a
        className="back-link"
        onClick={handleBack}
        disabled={isOnGameMap}s
      >
      </a>
      <a className="help-link" onClick={onButtonClick}>

      </a>
    </div>
  );
};

export default GameNav;
