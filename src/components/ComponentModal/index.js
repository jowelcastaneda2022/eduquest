import React, { useEffect, useState } from 'react';
import { connect } from 'unistore/react';
import './style.scss'; 
import { componentModal as componentModalHelper } from '../../helpers';

const ComponentModal = ({ componentModal, closeModal, content, showCloseBtn }) => {
  const [fadeType, setFadeType] = useState(null);

  useEffect(() => {
    if (componentModal !== null) {
      setFadeType('in');
    } else {
      setFadeType('out');
    }
  }, [componentModal]);

  const closeModalHandler = () => {
    setFadeType('out');
    setTimeout(() => {
      if (closeModal) {
        closeModal();
      }
      componentModalHelper(null);
    }, 300);
  };

  return (
    <>
      {componentModal !== null && (
        <div className={`modal-overlay fade-${fadeType}`} onClick={closeModalHandler}>
          <div className={`modal-content fade-${fadeType}`} onClick={(e) => e.stopPropagation()}>
            {showCloseBtn && <button className="modal-close-btn" onClick={closeModalHandler}></button>}
            {content(closeModalHandler)}
          </div>
        </div>
      )}
    </>
  );
};

export default connect('componentModal')(ComponentModal);
