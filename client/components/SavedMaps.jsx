import React from 'react';

const SavedMaps = ({ friendmaps, privateMaps }) => {
	const combinedCollection = Object.assign({}, friendmaps, privateMaps);

	const mapDisplayGenerator = (mapName, mapData) => {
		return (
			<div className='map-thumbnail' id={mapName}>
				<p>{mapName}</p>
				<svg>{mapData}</svg>
			</div>
		);
	};

	// Checks if number of saved maps is greater than 0
	if (Object.keys(combinedCollection).length > 0) {
		return Object.entries(combinedCollection).forEach(([mapName, mapData]) => {
			mapDisplayGenerator(mapName, mapData);
		});
		// If no saved maps, display message
	} else {
		return (
			<div className='saved-maps-display'>
				<h2>No maps saved</h2>
			</div>
		);
	}
};

export default SavedMaps;
