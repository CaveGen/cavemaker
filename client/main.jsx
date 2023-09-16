import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import MainContainerMember from './containers/MainContainerMember.jsx';

const CaveMaker = () => {
	// if (!loggedIn) {
	// 	return (
	// 		// Render App with limited functionality
	// 		<MainContainerGuest />
	// 	)
	// }
	// else {
	// return (
	// 	// Render App with full functionality
	// 	<MainContainerMember />;
	// )
	// }
	return <MainContainerMember />;
};

const root = createRoot(document.getElementById('root'));
root.render(<CaveMaker />);

export default CaveMaker;
