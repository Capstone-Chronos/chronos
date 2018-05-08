import React from 'react';

// var xaxis = d3.axisBottom(100);

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   // timelines: [{ id: 1, name: 'timeline 1' }, { id: 2, name: 'timeline 2' }, { id: 3, name: 'timeline 3' }]
    // };
  }

  // componentDidMount() {
  //   d3.select("svg")
  //     .append("g")
  //     .attr('transform', )
  // }

  render() {
    return (
      <div>
        <svg width="90vw" height="90vh" id="timeline" style={color}>
          <div id="axis" />
          <circle
            key={1}
            cx="250"
            cy="300"
            r="50"
            style={{ fill: 'steelblue' }}
          />
        </svg>
      </div>
    );
  }
}

const color = { backgroundColor: 'black' };
