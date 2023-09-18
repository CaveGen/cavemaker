import React from 'react';

const downloadMapImage = ({ svgRef }) => {
  // Grab the map and assign it to variable
  const svgElement = svgRef.current;

  // Serialize SVG to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  console.log(svgString);
  // Create Blob object from SVG string
  const blob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });

  // Convert Blob to a data URL
  const url = URL.createObjectURL(blob);

  // Create an `<a>` element and trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'download.svg';
  a.click();
};

const saveMapToCollection = () => {
  console.log('Save Map to Collection!');
  // Grab the map and assign it to variable
  const svgElement = svgRef.current;

  // Serialize the map SVG to a string
  const seializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  // Create Blob object from SVG String
  const blob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });

  fetch('api/saveMap', {
    //What should this URI be?
    method: 'POST',
    body: blob,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
};

const searchDbForUser = () => {
  console.log('Search the database for a user!');
};

const retrieveMapsFromShared = () => {};

const shareMapWithUser = () => {
  console.log('Map Shared with user!');
};

const MapFunctionsModule = ({ svgRef }) => {
  return (
    <div className="mapFunctionsModule">
      <div className="mapFunctionsContainer">
        <button
          className="mapFunctionsButtons"
          id="saveMapImageButton"
          onClick={() => downloadMapImage({ svgRef })}
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