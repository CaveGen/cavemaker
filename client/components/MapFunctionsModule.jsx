import React from 'react';

const downloadMapImage = () => {
  console.log('Download map image!');
};


const saveMapToCollection = ({ svgRef, username }) => {
  console.log('Saved Map to Collection!');
  // Grab the map and assign it to variable
  const svgElement = svgRef.current;

  // Serialize the map SVG to a string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  // Create Blob object from SVG String
  const blob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });

  fetch('http://localhost:3000/map/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "newMap": {
        "mapName": 'MAP NAME STATE HERE',
        "mapData": svgString
      }
    })
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been saved!'))
    .catch((error) => console.error('Error:', error));

};

const deleteMapFromCollection = ({ username }) => {
  fetch('http://localhost:3000/map/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "mapName": 'MAP NAME STATE HERE'
    })
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been removed!'))
    .catch((error) => console.error('Error:', error));
}

const searchDbForUser = () => {
  console.log('Search the database for a user!');
};


export const retrieveMapsFromShared = ({ username }) => {
  return fetch(`http://localhost:3000/friendmaps/${username}`)
    .then(res => res.json())
    .then(data => {
      return data.maps;
    })
    .catch(err => {
      console.error('Error fetching friend maps: ', err);
      return [];
    })
};

export const retrieveMapsFromCollection = ({ username }) => {
  return fetch(`http://localhost:3000/mapcollection/${username}`)
    .then(res => res.json())
    .then(data => {
      return data.maps;
    })
    .catch(err => {
      console.error('Error fetching friend maps: ', err);
      return [];
    })
}

const shareMapWithUser = ({ svgRef, username }) => {
  console.log('Added to shared maps!');
  // Grab the map and assign it to variable
  const svgElement = svgRef.current;

  // Serialize the map SVG to a string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  // Create Blob object from SVG String
  const blob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });

  fetch('http://localhost:3000/map/share', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "mapName": 'MAP NAME STATE HERE',
      "mapData": svgString
    })
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been shared!'))
    .catch((error) => console.error('Error:', error));
};

const unshareMapWithUser = ({ username }) => {
  fetch('http://localhost:3000/map/unshare', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "mapName": 'MAP NAME STATE HERE'
    })
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been unshared!'))
    .catch((error) => console.error('Error:', error));
}

const addFriend = ({ username }) => {
  fetch('http://localhost:3000/friend/add', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "friend": 'FRIEND NAME STATE HERE'
    })
  })
    .then((res) => res.json())
    .then((data) => alert('Friend added! You can now share your maps that you authorize with them!'))
    .catch((error) => console.error('Error:', error));
}

const removeFriend = ({ username }) => {
  fetch('http://localhost:3000/friend/delete', {

    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "friend": 'FRIEND NAME STATE HERE'
    })
  })
    .then((res) => res.json())
    .then((data) => alert('Friend removed. They can no longer see maps you\'ve shared.'))
    .catch((error) => console.error('Error:', error));
}

const MapFunctionsModule = ({ svgRef, username }) => {

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
