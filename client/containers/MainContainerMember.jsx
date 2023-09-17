import React, { useState } from 'react';
import SlidersModule from '../components/SlidersModule.jsx';
import MapDisplayModule from '../components/MapDisplayModule.jsx';
import SavedMapModule from '../components/SavedMapModule.jsx';

const MainContainerMember = () => {
  // State management for sliders
  const [length, setLength] = useState(60);
  const [fill, setFill] = useState(40);
  const [smooth, setSmooth] = useState(8);
  const [shouldRegenerate, setShouldRegenerate] = useState(false);

  return (
    <div className="mainContainer">
      <div id="banner"></div>
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
      {/* <div id="nav"></div> */}
      <div id="map">
        <MapDisplayModule
          length={length}
          fill={fill}
          smooth={smooth}
          shouldRegenerate={shouldRegenerate}
          setShouldRegenerate={setShouldRegenerate}
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
