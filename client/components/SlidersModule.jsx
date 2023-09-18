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

  const randomizeSliders = () => {
    const randomLength = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    const randomFill = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    const randomSmooth = Math.floor(Math.random() * (20 - 0 + 1)) + 0;

    setLength(randomLength);
    setFill(randomFill);
    setSmooth(randomSmooth);

    setSliderValues([randomLength, randomFill, randomSmooth]);
  };

  return (
    <div className="slidersModule">
      <div className="slider-container">
        <div id="gridSlider">
          <label>Grid Size:</label>
          <span className="slider-minValue">20</span>
          {/* if min/max changed, update range of randomSliders */}
          <input
            type="range"
            min="20"
            max="120"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="slider-maxValue">120</span>
          <p className="slider-curValue">{length}</p>
        </div>
        <div id="fillSlider">
          <label> Fill Percentage: </label>
          <span className="slider-minValue">35</span>
          <input
            type="range"
            min="35"
            max="50"
            step="0.1"
            value={fill}
            onChange={(e) => setFill(e.target.value)}
          />
          <span className="slider-maxValue">50</span>
          <p className="slider-curValue">{fill}%</p>
        </div>
        <div id="smoothingSlider">
          <label>Smoothing Iterations:</label>
          <span className="slider-minValue">0</span>
          <input
            type="range"
            min="0"
            max="20"
            value={smooth}
            onChange={(e) => setSmooth(e.target.value)}
          />
          <span className="slider-maxValue">15</span>
          <p className="slider-curValue">{smooth}</p>
        </div>
        <div id="randomizeSliders">
          <button onClick={randomizeSliders}>Randomize Sliders</button>
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
