import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GameNav, GameModal } from '../../components';
import homeBgLogo from '../../assets/images/home-bg.png'
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
      path: "/math-mountain"
    },
    {
      text: "Scramble Savannah",
      path: "/scramble-savannah"
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

  console.error('props.math', props.math)

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
                    <div>{index + 1}</div>
                  </div>
                  <div className="stars">
                    <FontAwesomeIcon icon={solidStar} size="xl" />
                    <FontAwesomeIcon icon={solidStar} size="xl" />
                    <FontAwesomeIcon icon={solidStar} size="xl" />
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

export default connect('math')(MapPage);