import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import './style.css';
import { set } from 'mongoose';
import caveMaker from './caveMaker.js';
import Cavern from './caveGenerator.jsx';

function CaveMaker() {
    return (
        <Cavern />
    )
}

export default CaveMaker;