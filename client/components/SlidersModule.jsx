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
          <label>Size: {length}</label>{' '}
          <span className="slider-minValue">20</span>
          {/* if min/max changed, update range of randomSliders */}
          <input
            className="slider"
            type="range"
            min="20"
            max="120"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="slider-maxValue">120</span>
        </div>
        <div id="fillSlider">
          <label> Fill: {fill}% </label>
          <span className="slider-minValue">35</span>
          <input
            className="slider"
            type="range"
            min="35"
            max="50"
            step="0.1"
            value={fill}
            onChange={(e) => setFill(e.target.value)}
          />
          <span className="slider-maxValue">50</span>
        </div>
        <div id="smoothingSlider">
          <label>Smoothing: {smooth}</label>
          <span className="slider-minValue">0</span>
          <input
            className="slider"
            type="range"
            min="0"
            max="20"
            value={smooth}
            onChange={(e) => setSmooth(e.target.value)}
          />
          <span className="slider-maxValue">15</span>
        </div>
        <div id="randomizeSliders">
          <button onClick={randomizeSliders}>
            <p>Randomize Sliders</p>
          </button>
        </div>
        <div id="generateCavern">
          <button onClick={() => setShouldRegenerate(true)}>
            <p>Generate Map</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlidersModule;
