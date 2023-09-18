import React, { useState, useEffect, useRef } from 'react';
import SlidersModule from '../components/SlidersModule.jsx';
import MapDisplayModule from '../components/MapDisplayModule.jsx';
import SavedMapModule from '../components/SavedMapModule.jsx';
import MapFunctionsModule from '../components/MapFunctionsModule.jsx';
import { retrieveMapsFromShared } from '../components/MapFunctionsModule.jsx';
import { retrieveMapsFromCollection } from '../components/MapFunctionsModule.jsx';

const MainContainerMember = (props) => {
  // State management for sliders
  const [length, setLength] = useState(60);
  const [fill, setFill] = useState(40);
  const [smooth, setSmooth] = useState(8);
  const [shouldRegenerate, setShouldRegenerate] = useState(false);

  const [friendmaps, setFriendMaps] = useState({});
  const [privateMaps, setPrivateMaps] = useState({});
  console.log('friendmaps: ', friendmaps);

  //This populates the friendmaps state with shared maps from friends.
  useEffect(() => {
    retrieveMapsFromShared(props).then((maps) => {
      const friendlyMaps = {};
      for (let friend in maps) {
        for (let map in maps[friend]) {
          friendlyMaps[map] = maps[friend][map];
        }
      }
      setFriendMaps(friendlyMaps);
      retrieveMapsFromCollection(props).then((maps) => {
        const retrievedPrivateMaps = {};
        for (let map in maps) {
          retrievedPrivateMaps[map] = maps[map];
        }
        setPrivateMaps(retrievedPrivateMaps);
      });
    });
  }, []);

  // Hook for SVG download
  const svgRef = useRef(null);
  console.log('svgRef in MainContainer', svgRef);

  return (
    <div className="mainContainer">
      <div id="banner"></div>
      <div id="sliders">
        <SlidersModule
          length={length}
          setLength={setLength}
          fill={fill}
          setFill={setFill}
          smooth={smooth}
          setSmooth={setSmooth}
          setShouldRegenerate={setShouldRegenerate}
        />
      </div>
      <div id="mapfunc">
        <MapFunctionsModule
          svgRef={svgRef}
          username={props.username}
        />
      </div>
      <div id="map">
        <MapDisplayModule
          length={length}
          fill={fill}
          smooth={smooth}
          shouldRegenerate={shouldRegenerate}
          setShouldRegenerate={setShouldRegenerate}
          username={props.username}
          svgRef={svgRef}
        />
      </div>
      <div id="saved">
        <SavedMapModule
          friendmaps={friendmaps}
          privateMaps={privateMaps}
        />
      </div>
      <div id="footer"></div>
    </div>
  );
};

export default MainContainerMember;
