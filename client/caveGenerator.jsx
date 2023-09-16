import React, { useState, useEffect } from 'react';
import './style.css';

const topRank = new Set();
const bottomRank = new Set();
const leftFile = new Set();
const rightFile = new Set();

function Cavern() {
    const [boxes, setBoxes] = useState([])
    console.log('here is topRank', topRank);
    console.log('here is bottomRank', bottomRank);
    console.log('here is leftFile', leftFile);
    console.log('here is rightFile', rightFile);

    useEffect(() => {
        const arr = generateCave(60, 40, 8);
        setBoxes(arr);
    }, []);

    function generateCave(length, fill, smooth) {
        for (let i = 0; i < length; i++) {
            topRank.add(i);
            bottomRank.add(((length * length) - length) + i);
        }
        for (let i = 0; i < length * length; i += length) {
            leftFile.add(i);
            rightFile.add(i + length - 1);
        }
        let arr = [];
        for (let i = 0; i < length * length; i++) {
            if (topRank.has(i) || bottomRank.has(i) || leftFile.has(i) || rightFile.has(i)) {
                arr.push(<Box key={i} color={'b'} />);
            }
            else {
                const num = rollDice(fill)
                num === 1 ? arr.push(<Box key={i} color={'b'} />) : arr.push(<Box key={i} color={'w'} />);
            }
        }

        for (let i = 0; i < smooth; i++) {
            arr = smoothWalls(arr, length);
        }

        return arr;
    }

    function rollDice(number) {
        return Math.random() * 100 > number ? 1 : 0
    }

    function smoothWalls(array, length) {
        let newArray = array.map(cell => ({ ...cell }));

        for (let i = 0; i < array.length; i++) {
            if (!topRank.has(i) && !bottomRank.has(i) && !leftFile.has(i) && !rightFile.has(i)) {
                inspectNeighbors(array, i, length) > 4 ? newArray[i] = <Box key={i} color={'b'} /> : newArray[i] = <Box key={i} color={'w'} />;
            }
        }
        return newArray;
    }


    function inspectNeighbors(array, index, length) {
        let wallCount = 0;
        array[index - 1].props.color === 'b' ? wallCount++ : wallCount;
        array[index + 1].props.color === 'b' ? wallCount++ : wallCount;
        array[index - length].props.color === 'b' ? wallCount++ : wallCount;
        array[index - length - 1].props.color === 'b' ? wallCount++ : wallCount;
        array[index - length + 1].props.color === 'b' ? wallCount++ : wallCount;
        array[index + length].props.color === 'b' ? wallCount++ : wallCount;
        array[index + length - 1].props.color === 'b' ? wallCount++ : wallCount;
        array[index + length + 1].props.color === 'b' ? wallCount++ : wallCount;
        return wallCount;
    }

    return (
        <div className="cavern">{boxes}</div>
    )
}

const Box = (props) => {
    if (props.color === 'b') {
        return (
            <div className="box" id="wall"></div>
        )
    }
    else {
        return (
            <div className="box" id="space"></div>
        )
    }
}


// const root = createRoot(document.getElementById('content'));
// root.render(<Cavern />)

export default Cavern;