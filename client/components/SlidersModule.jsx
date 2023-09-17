import e from 'cors';
import React, { useState } from 'react';

const SlidersModule = ({
  length,
  setLength,
  fill,
  setFill,
  smooth,
  setSmooth,
  setShouldRegenerate,
}) => {
  const [sliderValues, setSliderValues] = useState([0, 0, 0, 0]);

  const handleSliderChange = (event, index) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = event.target.value;
    setSliderValues(newSliderValues);
  };

  return (
    <div className="slidersModule">
      <div className="slider-container">
        <div id="gridSlider">
          <label>Grid Size:</label>
          <input
            type="range"
            min="10"
            max="100"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div id="fillSlider">
          <label> Fill Percentage: </label>
          <input
            type="range"
            min="10"
            max="100"
            value={fill}
            onChange={(e) => setFill(e.target.value)}
          />
        </div>
        <div id="smoothingSlider">
          <label>Smoothing Iterations:</label>
          <input
            type="range"
            min="10"
            max="100"
            value={smooth}
            onChange={(e) => setSmooth(e.target.value)}
          />
        </div>
        <div id="generateCavern">
          <button onClick={() => setShouldRegenerate(true)}>
            Generate Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidersModule;
