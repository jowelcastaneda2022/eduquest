import React from 'react';
import { connect } from 'unistore/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ComponentModal } from './components';
import { HomePage, WelcomePage, MapPage, MathPage, WordScramblePage, GuessItSpellIt, HowToPage, MemoryGame } from './pages';


function App(props) {
  const renderComponentModal = () => {
	  const { componentModal } = props;
	  try {
	    const props = { ...componentModal };
	    return <ComponentModal {...props} />;
	  } catch (err) {
	    console.error('renderComponentModal >> Error:', err);
	    return null;
	  }
	};

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/game-map" element={<MapPage />} />
          <Route path="/math-mountain" element={<MathPage />} />
          <Route path="/scramble-savannah" element={<WordScramblePage />} />
          <Route path="/spellbound-sands" element={<GuessItSpellIt />} />
          <Route path="/how-to-play" element={<HowToPage />} />
          <Route path="/flipstone-falls" element={<MemoryGame />} />
        </Routes>

        {props.componentModal && renderComponentModal()}
      </div>
    </Router>
  );
}

export default connect('componentModal')(App);
