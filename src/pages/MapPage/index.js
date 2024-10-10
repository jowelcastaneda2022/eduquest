import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { GameNav, GameModal } from '../../components';
import welcomeTitle from '../../assets/images/welcome-title.png';
import key from '../../assets/images/Inventa-island-key.png';
import { getItem, componentModal } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

function MapPage(props) {
  const [openModal, setOpenModal] = useState(false);

  const getScorePercentage = (name) => {
    return props[name].scorePercentage
      ? props[name].scorePercentage
      : getItem(name)
        ? getItem(name).scorePercentage
        : props[name].scorePercentage
  }

  const challenges = [
    {
      text: "Math Mountain",
      path: "/math-mountain",
      rate: getScorePercentage('math')
    },
    {
      text: "Scramble Savannah",
      path: "/scramble-savannah",
      rate: getScorePercentage('wordScramble')
    },
    {
      text: "Spellbound Sands",
      path: "/spellbound-sands",
      rate: 100
    },
    {
      text: "Flipstone Falls",
      path: "/flipstone-falls",
      rate: 100
    }
  ];

  const showModal = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    const allRatesAbove89 = challenges.every((challenge) => challenge.rate > 89);
    if (allRatesAbove89) {
      showAllKeysModal()
    }
  }, []);

  const showAllKeysModal = () => {
    componentModal({
      content: (closeModalHandler) => (
        <div className="key-modal">
          <div className="header">
            <img src={key} alt="key" />
            <img src={key} alt="key" />
            <img src={key} alt="key" />
            <img src={key} alt="key" />
          </div>
          <div className="body">
            <h2>You did it!</h2>
            <p>You've found all four keys</p>
            <button className="btn-style"
              onClick={() => closeModalHandler() }>
              Back to home
            </button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="game-map">
      <img className="welcome-title" src={welcomeTitle} alt="Map" />
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
                    {challenge.rate > 89
                      ? <img className="key" src={key} alt="key" width="100%" height="100%" />
                      : <div className="number">{index + 1}</div>
                    }
                  </div>
                  <div className="stars">
                    <FontAwesomeIcon icon={solidStar} className={challenge.rate > 1 ? 'solidStar' : 'regularStar'} size="xl" />
                    <FontAwesomeIcon icon={solidStar} className={challenge.rate > 30 ? 'solidStar' : 'regularStar'} size="xl" />
                    <FontAwesomeIcon icon={solidStar} className={challenge.rate > 89 ? 'solidStar' : 'regularStar'} size="xl" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {openModal && (
        <GameModal
          description=""
          onButtonClick={showModal}
          type="howTo"
        />
      )}

      <GameNav onButtonClick={showModal} />
    </div>
  );
}

export default connect(['math', 'wordScramble'])(MapPage);