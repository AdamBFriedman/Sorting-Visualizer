import React, { Component } from 'react';

class SortingVisualizer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];

    for (let i=0; i< 100; i++) {
      array.push(randomNumFromInterval(5, 1000));
    }

    this.setState({array});
  }
    render(){
      const {array} = this.state;
        return(
        <>
          {array.map((value, idx) => (
            <div className="array-bar" key={idx}>
              {value}
            </div>
          ))}
        </>
        )
    }
} 

function randomNumFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;