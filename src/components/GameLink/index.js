import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

const GameLink = ({ text, path }) => {
  return (
    <Link className="game-link" to={path ? path : '/'}>
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="text">{text}</span>
    </Link>
  );
};

export default GameLink;