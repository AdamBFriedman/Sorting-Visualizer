import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms';

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
      arrayBars: '400',
      animationSpeed: 1,
      primaryColor: '#fff',
      startingColor: '#ed3330'
		};
	}

	componentDidMount() {
		this.resetArray();
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
				const color = i % 3 === 0 ? this.state.primaryColor : this.state.startingColor;
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
		let randomColor = '#' + Math.random().toString(16).slice(2, 8);
		this.setState({ startingColor: randomColor})
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
		return (
			<>
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{ height: `${value}px`, backgroundColor: this.state.startingColor}}
						></div>
					))}
				</div>
				<div className="mergeSort__container">
					<p className="mergeSort mergeSort__top">MERGE SORT</p>
					<p className="mergeSort mergeSort__bot">MERGE SORT</p>
				</div>
        
				<div className="button-row">
					<button onClick={() => this.resetArray()}>Generate New Array</button>
					<button onClick={() => this.mergeSort()}>Merge Sort</button>
					<button onClick={() => this.randomColor()}>Random Color</button>

					<label>
						Enter a number to change length of array
					</label>
					<input type="text" name="input" value={this.state.input} onChange={this.handleChange.bind(this)} />
					<button type="button" onClick={() => this.handleClick()}>Enter</button>
				</div>
        <h1 className="length">Current Array Length: {this.state.arrayBars}</h1>
			</>
		);
	}
}

function randomNumFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
