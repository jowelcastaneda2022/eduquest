import React from 'react';
import { MapLink } from '../../components';
import './style.scss'

function MapPage() {
  return (
    <div className="map-page">
      <div className="content">
        <h1>Select your learning adventure!</h1>
        <nav>
          <ul>
            <li>
              <MapLink text="Math Mountain" path="/math-mountain" />
            </li>
            <li>
              <MapLink text="Scramble Savannah" path="/scramble-savannah" />
            </li>
            <li>
              <MapLink text="Spellbound Sands" path="/spellbound-sands" />
            </li>
            <li>
              <MapLink text="Flipstone Falls" path="/flipstone-falls" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MapPage;