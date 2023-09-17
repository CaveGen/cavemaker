import React, { useState, useEffect } from 'react';

// Consider having neighborCheck

const topRank = new Set();
const bottomRank = new Set();
const leftFile = new Set();
const rightFile = new Set();

function Cavern({
  length,
  fill,
  smooth,
  shouldRegenerate,
  setShouldRegenerate,
}) {
  const [boxes, setBoxes] = useState([]);

  console.log('here is topRank', topRank);
  console.log('here is bottomRank', bottomRank);
  console.log('here is leftFile', leftFile);
  console.log('here is rightFile', rightFile);

  useEffect(() => {
    if (shouldRegenerate) {
      const arr = generateCave(length, fill, smooth);
      setBoxes(arr);
      setShouldRegenerate(false);
    }
  }, [length, fill, smooth, shouldRegenerate]);

  function generateCave(length, fill, smooth) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const index = i * length + j;

        const x = j * 10;
        const y = i * 10;

        if (
          topRank.has(index) ||
          bottomRank.has(index) ||
          leftFile.has(index) ||
          rightFile.has(index)
        ) {
          arr.push(
            <Box
              key={index}
              x={x}
              y={y}
              color={'b'}
            />
          );
        } else {
          const num = rollDice(fill);
          const color = num === 1 ? 'b' : 'w';
          arr.push(
            <Box
              key={index}
              x={x}
              y={y}
              color={color}
            />
          );
        }
      }
    }

    for (let i = 0; i < smooth; i++) {
      arr = smoothWalls(arr, length);
    }

    return arr;
  }

  function rollDice(number) {
    return Math.random() * 100 > number ? 1 : 0;
  }

  function smoothWalls(array, length) {
    let newArray = array.map((cell, i) => {
      const x = (i % length) * 10;
      const y = Math.floor(i / length) * 10;

      if (
        !topRank.has(i) &&
        !bottomRank.has(i) &&
        !leftFile.has(i) &&
        !rightFile.has(i)
      ) {
        return (
          <Box
            key={i}
            x={x}
            y={y}
            color={inspectNeighbors(array, i, length) > 4 ? 'b' : 'w'}
          />
        );
      }
      return cell;
    });
    return newArray;
  }

  function inspectNeighbors(array, index, length) {
    // Re-factoring to implement boundary checks
    let wallCount = 0;

    // Calculate row and column for clarity
    const row = Math.floor(index / length);
    const col = index % length;

    // Relative indices of neighbors
    const neighbors = [
      [-1, 0], // left
      [1, 0], // right
      [0, -1], // Above
      [0, 1], // below
      [-1, -1], // Diagonal Left Top
      [-1, -1], // Diagonal Left Bottom
      [1, -1], // Diagonal Right Top
      [1, 1], // Diagonal Right Bottom
    ];

    for (let [dx, dy] of neighbors) {
      const newRow = row + dx;
      const newCol = col + dy;

      // Check boundary conditions
      if (newRow >= 0 && newRow < length && newCol >= 0 && newCol < length) {
        const newIndex = newRow * length + newCol;
        if (array[newIndex] && array[newIndex].props.color === 'b') {
          wallCount++;
        }
      }
    }

    // array[index - 1].props.color === 'b' ? wallCount++ : wallCount;
    // array[index + 1].props.color === 'b' ? wallCount++ : wallCount;
    // array[index - length].props.color === 'b' ? wallCount++ : wallCount;
    // array[index - length - 1].props.color === 'b' ? wallCount++ : wallCount;
    // array[index - length + 1].props.color === 'b' ? wallCount++ : wallCount;
    // array[index + length].props.color === 'b' ? wallCount++ : wallCount;
    // array[index + length - 1].props.color === 'b' ? wallCount++ : wallCount;
    // array[index + length + 1].props.color === 'b' ? wallCount++ : wallCount;
    return wallCount;
  }

  // return <div className="cavern">{boxes}</div>;
  return (
    <svg
      width={length * 10}
      height={length * 10}
    >
      {boxes}
    </svg>
  );
}
const Box = (props) => {
  const color = props.color === 'b' ? '#a1a1a1' : '#2e3033';
  return (
    <rect
      x={props.x}
      y={props.y}
      width={10}
      height={10}
      fill={color}
    />
  );
};

// const Box = (props) => {
//   if (props.color === 'b') {
//     return (
//       <div
//         className="box"
//         id="wall"
//       ></div>
//     );
//   } else {
//     return (
//       <div
//         className="box"
//         id="space"
//       ></div>
//     );
//   }
// };

// const root = createRoot(document.getElementById('content'));
// root.render(<Cavern />)

export default Cavern;
