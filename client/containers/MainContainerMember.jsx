import React, { useState, useRef } from 'react';
import SlidersModule from '../components/SlidersModule.jsx';
import MapDisplayModule from '../components/MapDisplayModule.jsx';
import SavedMapModule from '../components/SavedMapModule.jsx';
import MapFunctionsModule from '../components/MapFunctionsModule.jsx';

const MainContainerMember = () => {
  // State management for sliders
  const [length, setLength] = useState(60);
  const [fill, setFill] = useState(40);
  const [smooth, setSmooth] = useState(8);
  // State management to prevent map from re-gen until after button is clicked
  const [shouldRegenerate, setShouldRegenerate] = useState(false);
  // Hook for SVG download
  const svgRef = useRef(null);

  return (
    <div className="mainContainer">
      <div id="banner">
        <img
          id="banner-logo"
          src="../assets/CaveGen.png"
        />
      </div>
      <div id="sliders">
        <SlidersModule
          length={length}
          setLength={setLength}
          fill={fill}
          setFill={setFill}
          smooth={smooth}
          setSmooth={setSmooth}
          setShouldRegenerate={setShouldRegenerate}
        />
      </div>
      <div id="mapfunc">
        <MapFunctionsModule svgRef={svgRef} />
      </div>
      <div id="map">
        <MapDisplayModule
          length={length}
          fill={fill}
          smooth={smooth}
          shouldRegenerate={shouldRegenerate}
          setShouldRegenerate={setShouldRegenerate}
          svgRef={svgRef}
        />
      </div>
      <div id="saved">
        <SavedMapModule />
      </div>
      <div id="footer"></div>
    </div>
  );
};

export default MainContainerMember;
