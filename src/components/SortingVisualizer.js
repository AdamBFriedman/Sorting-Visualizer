import { useState, useEffect, useCallback } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms';

const generateRandomColor = () =>
  '#' + Math.random().toString(16).slice(2, 8);

const randomNumFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateArray = (length) => {
  return Array.from({ length }, () => randomNumFromInterval(5, 730));
};

// Set the CSS variable immediately before component renders
const initialColor = generateRandomColor();
document.documentElement.style.setProperty(
  '--primary-color',
  initialColor
);

export default function SortingVisualizer() {
  const [arrayBars, setArrayBars] = useState(
    window.innerWidth <= 600 ? 100 : 350
  );
  const [animationSpeed] = useState(1);
  const [primaryColor] = useState('#fff');
  const [startingColor, setStartingColor] = useState(initialColor);
  const [array, setArray] = useState(() => generateArray(arrayBars));

  // Update CSS variable when color changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--primary-color',
      startingColor
    );
  }, [startingColor]);

  const resetArray = useCallback(() => {
    setArray(generateArray(arrayBars));
  }, [arrayBars]);

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    const arrayBarElements =
      document.getElementsByClassName('array-bar');

    animations.forEach((animation, i) => {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation;
        const color = i % 3 === 0 ? primaryColor : startingColor;

        setTimeout(() => {
          arrayBarElements[barOneIdx].style.backgroundColor = color;
          arrayBarElements[barTwoIdx].style.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        const [barOneIdx, newHeight] = animation;

        setTimeout(() => {
          arrayBarElements[barOneIdx].style.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    });
  };

  const randomColor = () => {
    const newColor = generateRandomColor();
    setStartingColor(newColor);
    setArray(generateArray(arrayBars));
  };

  const handleArrayLengthChange = (e) => {
    setArrayBars(e.target.value);
  };

  const handleArrayLengthSubmit = () => {
    setArray(generateArray(arrayBars));
  };

  const textShadowStyle = {
    textShadow: `
			2px 1px ${startingColor},
			4px 2px ${startingColor},
			6px 4px ${startingColor},
			8px 5px ${startingColor},
			10px 6px ${startingColor},
			12px 7px ${startingColor},
			14px 8px ${startingColor},
			16px 9px black,
			18px 10px black,
			20px 11px black,
			22px 12px black,
			24px 13px black,
			28px 14px rgba(0, 0, 0, 0.9),
			30px 15px rgba(0, 0, 0, 0.7),
			32px 16px rgba(0, 0, 0, 0.5),
			34px 17px rgba(0, 0, 0, 0.3),
			36px 18px rgba(0, 0, 0, 0.1),
			40px 20px rgba(0, 0, 0, 0.1)
		`,
  };

  return (
    <div className="flex-wrapper">
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: startingColor,
            }}
          />
        ))}
      </div>

      <div className="button-row">
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={randomColor}>Random Color</button>

        <label>Enter a number to change length of array</label>
        <input
          type="number"
          value={arrayBars}
          onChange={handleArrayLengthChange}
        />
        <button type="button" onClick={handleArrayLengthSubmit}>
          Enter
        </button>
      </div>

      <h1 className="length">Current Array Length: {arrayBars}</h1>

      <div className="mergeSort__container">
        <p className="mergeSort mergeSort__top">MERGE SORT</p>
        <p
          className="mergeSort mergeSort__bot"
          style={textShadowStyle}
        >
          MERGE SORT
        </p>
      </div>
    </div>
  );
}
