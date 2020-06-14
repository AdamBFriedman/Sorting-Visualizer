import React, { Component } from 'react';

class SortingVisualizer extends Component {
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

		for (let i = 0; i < 550; i++) {
			array.push(randomNumFromInterval(5, 1000));
		}

		this.setState({ array });
  }
  
  mergeSort() {

  }

  quickSort() {
    
  }

  heapSort() {
    
  }

  bubbleSort() {
    
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
						style={{height: `${value}px`}}>
					</div>
				))}
        
			</div>
      <div className="button-row">
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
      </>
		);
	}
}

function randomNumFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
