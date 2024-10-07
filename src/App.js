import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, WelcomePage, MapPage, MathPage, WordScramblePage, GuessItSpellIt, HowToPage} from './pages';


function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
