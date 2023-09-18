import React from 'react';

const downloadMapImage = ({ svgRef }) => {
  // Grab the svg element
  const svgElement = svgRef.current;

  // Serialize SVG to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  //
};

const saveMapToCollection = () => {
  console.log('Save Map to Collection!');
};

const searchDbForUser = () => {
  console.log('Search the database for a user!');
};

const retrieveMapsFromShared = () => {};

const shareMapWithUser = () => {
  console.log('Map Shared with user!');
};

const MapFunctionsModule = () => {
  return (
    <div className="mapFunctionsModule">
      <div className="mapFunctionsContainer">
        <button
          className="mapFunctionsButtons"
          id="saveMapImageButton"
          onClick={downloadMapImage}
        >
          Download Map
        </button>
        <button
          className="mapFunctionsButtons"
          id="saveMapToCollectionButton"
          onClick={saveMapToCollection}
        >
          Save Map to Collection
        </button>
        <label htmlFor="shareMapUserSearch">
          Share this map with:
          <input
            type="search"
            id="shareMapUserSearch"
            onChange={searchDbForUser}
          />
          <button onClick={shareMapWithUser}>Share</button>
        </label>
      </div>
    </div>
  );
};

export default MapFunctionsModule;
