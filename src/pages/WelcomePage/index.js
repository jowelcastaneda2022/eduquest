import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameModal } from '../../components';
import './style.scss';

function WelcomePage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);

  const closeWelcomeModal = () => {
    setOpenModal(false)
    navigate('/game-map');
  };

  return (
    <div className="welcome-page">
      {openModal && (
        <GameModal 
        type="howTo"
        header="Welcome to Inventa Island"
        description="The land of Inventa Island was once nourished by the Crystal of Knowledge, a powerful artifact said to ensure harmony by nurturing wisdom and learning. Dr. Veilmind, blinded by his desire for control, unleashed a curse that shattered"
        onButtonClick={closeWelcomeModal}/>
      )}
    </div>
  );
}

export default WelcomePage;