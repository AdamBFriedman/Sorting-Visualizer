import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrayBars: window.innerWidth <= 600 ? '100' : '350',
      animationSpeed: 1,
      primaryColor: '#fff',
      startingColor: this.generateRandomColor(), // Generate random color on initialization
    };
  }

  componentDidMount() {
    this.resetArray();
    // Set initial CSS variable value
    document.documentElement.style.setProperty(
      '--primary-color',
      this.state.startingColor
    );
  }

  generateRandomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.arrayBars; i++) {
      array.push(randomNumFromInterval(5, 730));
    }
    this.setState({ array });
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
        const color =
          i % 3 === 0
            ? this.state.primaryColor
            : this.state.startingColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.animationSpeed);
      }
    }
  }

  newArray() {
    const array = [];
    for (let i = 0; i < this.state.arrayBars; i++) {
      array.push(randomNumFromInterval(5, 730));
    }
    this.setState({ array });
  }

  randomColor() {
    let randomColor = this.generateRandomColor();
    this.setState({ startingColor: randomColor });

    // Update the CSS variable
    document.documentElement.style.setProperty(
      '--primary-color',
      randomColor
    );

    this.resetArray();
  }

  handleChange(e) {
    this.setState({ arrayBars: e.target.value });
  }

  handleClick() {
    const array = [];
    for (let i = 0; i < this.state.arrayBars; i++) {
      array.push(randomNumFromInterval(5, 730));
    }
    this.setState({ array });
  }

  render() {
    const { array } = this.state;

    // Generate dynamic text-shadow with the random color
    const textShadowStyle = {
      textShadow: `
				2px 1px ${this.state.startingColor},
				4px 2px ${this.state.startingColor},
				6px 4px ${this.state.startingColor},
				8px 5px ${this.state.startingColor},
				10px 6px ${this.state.startingColor},
				12px 7px ${this.state.startingColor},
				14px 8px ${this.state.startingColor},
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
                backgroundColor: this.state.startingColor,
              }}
            ></div>
          ))}
        </div>

        <div className="button-row">
          <button onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.randomColor()}>
            Random Color
          </button>

          <label>Enter a number to change length of array</label>
          <input
            type="number"
            name="input"
            value={this.state.input}
            onChange={this.handleChange.bind(this)}
          />
          <button type="button" onClick={() => this.handleClick()}>
            Enter
          </button>
        </div>
        <h1 className="length">
          Current Array Length: {this.state.arrayBars}
        </h1>

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
}

function randomNumFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
