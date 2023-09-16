import e from 'cors';
import React, { useState } from 'react';

const SlidersModule = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  return (
    <div className="slidersModule">
      <h2>This is the Sliders Module</h2>
      <input
        id="sliderAlpha"
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        className="sliderAlpha"
      />
    </div>
  );
};

export default SlidersModule;
