import React from 'react';
import d3 from 'd3';
import svg from 'svg';

<<<<<<< HEAD
// var xaxis = d3.axisBottom(100);

=======
>>>>>>> master
export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   // timelines: [{ id: 1, name: 'timeline 1' }, { id: 2, name: 'timeline 2' }, { id: 3, name: 'timeline 3' }]
    // };
  }

<<<<<<< HEAD
  // componentDidMount() {

  // }

  render() {
    {d3.select('axis')
      .call(d3.axisBottom(100));
    }
    return (
      <div>
        <svg width="90vw" height="90vh" id="timeline" style={color}>
          <div id="axis">
            <circle
              key={1}
              cx="250"
              cy="300"
              r="50"
              style={{ fill: 'steelblue' }}
            />
          </div>
        </svg>
      </div>);
=======
  componentDidMount() {
    d3.select("svg")
      .append("g")
      .attr('transform', )
  }

  render() {
    return <div>
      <svg width="90vw" height="90vh" id="timeline" style={color}>
      <div id="axis"></div>
        <circle
          key={1}
          cx="250"
          cy="300"
          r="50"
          style={{ fill: 'steelblue' }}
        />
      </svg>
    </div >
>>>>>>> master


  }
}

const color = { backgroundColor: 'black' };
