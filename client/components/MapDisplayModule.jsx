import React from 'react';
import Cavern from './CaveGenerator.jsx';

const MapDisplayModule = ({
  length,
  fill,
  smooth,
  shouldRegenerate,
  setShouldRegenerate,
  svgRef,
}) => {
  return (
    <div id="mapDisplayModuleContainer">
      <div className="mapDisplayModule">
        {/* <h2>This is the map display Module</h2> */}
        <Cavern
          svgRef={svgRef}
          length={length}
          fill={fill}
          smooth={smooth}
          shouldRegenerate={shouldRegenerate}
          setShouldRegenerate={setShouldRegenerate}
        />
      </div>
    </div>
  );
};

export default MapDisplayModule;
