import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GameNav, GameModal } from '../../components';
import welcomeTitle from '../../assets/images/welcome-title.png';
import key from '../../assets/images/Inventa-island-key.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'unistore/react';
import './style.scss';

function MapPage(props) {
  const [openModal, setOpenModal] = useState(false);
  const challenges = [
    {
      text: "Math Mountain",
      path: "/math-mountain",
      rate: props.math.scorePercentage
    },
    {
      text: "Scramble Savannah",
      path: "/scramble-savannah",
      rate: props.wordScramble.scorePercentage
    },
    {
      text: "Spellbound Sands",
      path: "/spellbound-sands"
    },
    {
      text: "Flipstone Falls",
      path: "/flipstone-falls"
    }
  ];

  const showModal = () => {
    setOpenModal(!openModal)
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
                    {challenge.rate > 30
                      ? <img className="key" src={key} alt="key" width="100%" height="100%" />
                      : <div className="number">{index + 1}</div>
                    }
                  </div>
                  <div className="stars">
                    <FontAwesomeIcon icon={solidStar} className={challenge.rate > 0 ? 'solidStar' : 'regularStar'} size="xl" />
                    <FontAwesomeIcon icon={solidStar} className={challenge.rate > 30 ? 'solidStar' : 'regularStar'} size="xl" />
                    <FontAwesomeIcon icon={solidStar} className={challenge.rate > 90 ? 'solidStar' : 'regularStar'} size="xl" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {openModal && (
        <GameModal description={""}
          onButtonClick={showModal}
          type="howTo"

        />
      )}

      <GameNav onButtonClick={showModal} />
    </div>
  );
}

export default connect(['math', 'wordScramble'])(MapPage);