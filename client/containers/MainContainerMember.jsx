import React from 'react';
import SlidersModule from '../components/SlidersModule.jsx';
import MapDisplayModule from '../components/MapDisplayModule.jsx';
import SavedMapModule from '../components/SavedMapModule.jsx';

const MainContainerMember = () => {
	return (
		<div className='mainContainer'>
			<div id='banner'></div>
			<div id='sliders'>
				<SlidersModule />
			</div>
			<div id='nav'></div>
			<div id='map'>
				<MapDisplayModule />
			</div>
			<div id='saved'>
				<SavedMapModule />
			</div>
			<div id='footer'></div>
		</div>
	);
};

export default MainContainerMember;
