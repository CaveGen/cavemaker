import React, { useState, useEffect } from 'react';

const downloadMapImage = ({ svgRef }) => {
  // Grab the svg element
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

const saveMapToPrivateCollection = ({ svgRef, mapNameState, username }) => {
  console.log('svgRef in saveMapToPrivateCollection', svgRef);
  console.log(svgRef.current);
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
      username: username,
      newMap: {
        mapName: mapNameState,
        mapData: svgString,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been saved!'))
    .catch((error) => console.error('Error:', error));
};

const deleteMapFromCollection = ({ username, mapNameState }) => {
  fetch('http://localhost:3000/map/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      mapName: mapNameState,
    }),
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been removed!'))
    .catch((error) => console.error('Error:', error));
};

const searchDbForUser = () => {
  console.log('Search the database for a user!');
};

export const retrieveMapsFromShared = ({ username }) => {
  return fetch(`http://localhost:3000/friendmaps/${username}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('retrieve maps from shared: ', data);
      return data;
    })
    .catch((err) => {
      console.error('Error fetching friend maps: ', err);
      return [];
    });
};

export const retrieveMapsFromCollection = ({ username }) => {
  return fetch(`http://localhost:3000/mapcollection/${username}`)
    .then((res) => res.json())
    .then((data) => {
      return data.maps;
    })
    .catch((err) => {
      console.error('Error fetching friend maps: ', err);
      return [];
    });
};

const addMapToPublicCollection = ({ svgRef, mapNameState, username }) => {
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
      username: username,
      mapName: mapNameState,
      mapData: svgString,
    }),
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been shared!'))
    .catch((error) => console.error('Error:', error));
};

const unshareMapWithUser = ({ username, mapNameState }) => {
  fetch('http://localhost:3000/map/unshare', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      mapName: mapNameState,
    }),
  })
    .then((res) => res.json())
    .then((data) => alert('Your map has been unshared!'))
    .catch((error) => console.error('Error:', error));
};

const addFriend = ({ username, friendNameState }) => {
  fetch('http://localhost:3000/friend/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      friend: friendNameState,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      alert(
        'Friend added! You can now share your maps that you authorize with them!'
      )
    )
    .catch((error) => console.error('Error:', error));
};

const removeFriend = ({ username, friendNameState }) => {
  fetch('http://localhost:3000/friend/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      friend: friendNameState,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      alert("Friend removed. They can no longer see maps you've shared.")
    )
    .catch((error) => console.error('Error:', error));
};

const MapFunctionsModule = ({ svgRef, username }) => {
  const [mapNameState, setMapNameState] = useState('');
  const [friendNameState, setFriendNameState] = useState('');

  function handleFriendInputChange(e) {
    const { name, value } = e.target;
    if (name === 'friendName') {
      setFriendNameState(value);
    }
    console.log('the map name has been set to: ', value);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'mapName') {
      setMapNameState(value);
    }
    console.log('the map name has been set to: ', value);
  }
  return (
    <div className="mapFunctionsModule">
      <div className="mapFunctionsContainer">
        <div className="shareAndNameMap">
          <label htmlFor="shareAndNameMap">
            <input
              type="text"
              name="mapName"
              placeholder="Map Name"
              value={mapNameState}
              id="sharedMapName"
              onChange={handleInputChange}
            />
            <button
              className="mapFunctionsButtons"
              id="addMapToPublic"
              onClick={() =>
                addMapToPublicCollection({ svgRef, mapNameState, username })
              }
            >
              Add to Public Collection |
            </button>
            <button
              className="mapFunctionsButtons"
              id="addMapToPrivate"
              onClick={() =>
                saveMapToPrivateCollection({ svgRef, mapNameState, username })
              }
            >
              Add to Private Collection |
            </button>
            <button
              className="mapFunctionsButtons"
              id="saveMapImageButton"
              onClick={() => downloadMapImage({ svgRef })}
            >
              Download Map |
            </button>
            <button
              className="mapFunctionButtons"
              id="deleteMapButton"
              onClick={() =>
                deleteMapFromCollection({ username, mapNameState })
              }
            >
              Delete Map
            </button>
            <button
              className="mapFunctionButtons"
              id="unshareMapButton"
              onClick={() => unshareMapWithUser({ username, mapNameState })}
            >
              Un-Share Map
            </button>
          </label>
        </div>
        <div className="addOrRemoveFriends">
          <label htmlFor="addOrRemoveFriends">
            <input
              type="text"
              name="friendName"
              placeholder="Friend Name"
              value={friendNameState}
              id="friendName"
              onChange={handleFriendInputChange}
            />
            <button
              className="friendFunctionButton"
              id="addFriendButton"
              onClick={() => {
                addFriend({ username, friendNameState });
              }}
            >
              Add Friend
            </button>
            <button
              className="friendFunctionButton"
              id="removeFriendButton"
              onClick={() => {
                removeFriend({ username, friendNameState });
              }}
            >
              Remove Friend
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MapFunctionsModule;
