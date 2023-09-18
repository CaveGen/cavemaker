import React from 'react';
import SavedMaps from './SavedMaps.jsx';

const SavedMapModule = ({ friendmaps, privateMaps }) => {
  console.log('privateMaps in SavedMapModule', privateMaps);
  console.log('publicMaps in SavedMapModule', friendmaps);
  return (
    <div className="savedMapModule">
      <h2>Saved Maps</h2>
      <SavedMaps
        friendmaps={friendmaps}
        privateMaps={privateMaps}
      />
    </div>
  );

  // return (
  // 	<div className='savedMapModule'>
  // 		<h2>This is the Saved Map Module</h2>
  // 	</div>
  // );
};

export default SavedMapModule;
