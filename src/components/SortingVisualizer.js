import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 570;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// We use let instead of const so we can generate random colors (button below)
let STARTING_COLOR = '#ed3330';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#451e3e';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomNumFromInterval(5, 730));
    }
    this.setState({array});
  }
  
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  randomColor() {
    let randomColor = "#" + Math.random().toString(16).slice(2, 8)
    STARTING_COLOR = randomColor;
    this.resetArray();
  }

	render() {
		const { array } = this.state;
		return (
      <>
			<div className="array-container">
				{array.map((value, idx) => (
          <div 
            className="array-bar" 
            key={idx}
						style={{height: `${value}px`, backgroundColor: STARTING_COLOR}}>
					</div>
				))}
        
			</div>
      <div class="vintage__container">
  <p class="vintage vintage__top">MERGE SORT</p>
  <p class="vintage vintage__bot">MERGE SORT</p>
</div>
      <div className="button-row">
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.randomColor()}>Random Color</button>
      </div>
      </>
		);
	}
}

function randomNumFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


