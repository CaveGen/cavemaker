import React from 'react';
import Cavern from './CaveGenerator.jsx';

const MapDisplayModule = ({
  length,
  fill,
  smooth,
  shouldRegenerate,
  setShouldRegenerate,
}) => {
  return (
    <div className="mapDisplayModule">
      <h2>This is the map display Module</h2>
      <Cavern
        length={length}
        fill={fill}
        smooth={smooth}
        shouldRegenerate={shouldRegenerate}
        setShouldRegenerate={setShouldRegenerate}
      />
    </div>
  );
};

export default MapDisplayModule;
