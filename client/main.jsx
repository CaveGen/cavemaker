import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import './style.css';
import { set } from 'mongoose';
import caveMaker from './caveMaker.js';
import Cavern from './caveGenerator.jsx';

function CaveMaker() {
    const [newCave, setNewCave] = useState(false);

    if (newCave) {
        return (
            <div>
                <Cavern key="on" />
                <button type="button" onClick={() => setNewCave(!newCave)}>Generate New Cave</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <Cavern key="off" />
                <button type="button" onClick={() => setNewCave(!newCave)}>Generate New Cave</button>
            </div>
        )
    }
}

export default CaveMaker;