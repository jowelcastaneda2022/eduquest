import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, MathPage, WordScramblePage, GuessItSpellIt } from './pages';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/number-crunching-game" element={<MathPage />} />
          <Route path="/word-scramble-game" element={<WordScramblePage />} />
          <Route path="/guess-it-spell-it" element={<GuessItSpellIt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
