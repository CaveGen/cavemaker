import React from 'react';

const SavedMaps = ({ friendmaps, privateMaps }) => {
	console.log('private maps in SavedMap', privateMaps);
	const combinedCollection = Object.assign({}, friendmaps, privateMaps);
	console.log(combinedCollection);

	const mapDisplayGenerator = (mapName, mapData) => {
		return (
			<div className='map-thumbnail' id={mapName}>
				<p>{mapName}</p>
				<svg width='50' height='50' viewBox='0 0 600 600' dangerouslySetInnerHTML={{ __html: mapData }} />
			</div>
		);
	};

	// Checks if number of saved maps is greater than 0
	if (Object.keys(combinedCollection).length > 0) {
		return <div id='thumbnail-display'>{Object.entries(combinedCollection).map(([mapName, mapData]) => mapDisplayGenerator(mapName, mapData))}</div>;
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
