import e from 'cors';
import React, { useState } from 'react';

const SlidersModule = () => {
  const [sliderValues, setSliderValues] = useState([0, 0, 0, 0]);

  const handleSliderChange = (event, index) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = event.target.value;
    setSliderValues(newSliderValues);
  };

  return (
    <div className="slidersModule">
      <div className="slider-container">
        <h2>This is the Sliders Module</h2>
        {sliderValues.map((value, index) => (
          <div
            key={index}
            className="sliders"
          >
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => handleSliderChange(e, index)}
              className="slider"
            />{' '}
            <p>
              Slider {index + 1} value: {value}
            </p>
          </div>
        ))}
      </div>
      {/* <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="sliderBeta"
      />{' '}
      <p>Slider value: {sliderValue}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="sliderGamma"
      />{' '}
      <p>Slider value: {sliderValue}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="sliderDelta"
      />{' '}
      <p>Slider value: {sliderValue}</p> */}
    </div>
  );
};

export default SlidersModule;
