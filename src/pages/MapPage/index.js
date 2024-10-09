import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { GameNav, GameModal } from '../../components';
import { getItem, componentModal } from '../../helpers';
import homeBgLogo from '../../assets/images/home-bg.png';
import key from '../../assets/images/key.png';
import keyIcon from '../../assets/images/key-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
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
      rate: 0
    },
    {
      text: "Flipstone Falls",
      path: "/flipstone-falls",
      rate: 0
    }
  ];

  const showModal = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    const allRatesAbove30 = challenges.every((challenge) => challenge.rate > 30);
    console.error(allRatesAbove30)
    if(allRatesAbove30){
      showAllKeysModal()
    }
  }, []);

  const showAllKeysModal = () => {
    componentModal({
      content: (
        <div className="key-modal">
          <div className="header">
            <img src={keyIcon} alt="key" />
            <img src={keyIcon} alt="key" />
            <img src={keyIcon} alt="key" />
            <img src={keyIcon} alt="key" />
          </div>
          <div className="body">
            <h1>You did it!</h1>
            <p>You've found all four keys</p>
            <button onClick={() => componentModal(null)}>Back to home</button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="game-map">
      <img className="home-bg" src={homeBgLogo} alt="Map" />
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
                    {challenge.rate > 30
                      ? <img className="key" src={key} alt="key" width="30px" height="30px" />
                      : <div className="number">{index + 1}</div>
                    }
                  </div>
                  <div className="stars">
                    <FontAwesomeIcon icon={challenge.rate > 1 ? solidStar : regularStar} size="xl" />
                    <FontAwesomeIcon icon={challenge.rate > 30 ? solidStar : regularStar} size="xl" />
                    <FontAwesomeIcon icon={challenge.rate > 90 ? solidStar : regularStar} size="xl" />
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