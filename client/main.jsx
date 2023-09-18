import React, { useState, useEffect } from 'react';
import MainContainerMember from './containers/MainContainerMember.jsx';
import Cavern from './caveGenerator.jsx'

const CaveMaker = (props) => {
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
    return <MainContainerMember username={props.username} />;
};

export default CaveMaker;