import React from 'react';
import { select } from 'd3-selection';
import { geoPath } from 'd3';
import topojson from 'topojson';
import us from './us-states';

export default class Choropleth extends React.Component {
  constructor(props) {
    super(props);
    this.createChoropleth = this.createChoropleth.bind(this);
  }

  componentDidMount() {
    this.createChoropleth();
  }

  componentDidUpdate() {
    this.createChoropleth();
  }

  createChoropleth() {
    const node = this.node;
    const states = us.objects.states;
    const geoData = topojson.feature(us, states).features;
    const path = geoPath();
    const lines = path(topojson.mesh(us, states, (a, b) => (a !== b)));

    select(node)
      .append('g')
      .attr('class', 'states')
      .selectAll('path')
      .data(geoData)
      .enter()
      .append('path')
      .attr('d', path);

    select(node)
      .append('path')
      .attr('class', 'state-borders')
      .attr('p', lines);
  }

  render() {
    console.log('Rendering choropleth of the US states....');

    return (
      <div className="chartContainer">
        <svg
          id="choropleth"
          ref={node => { this.node = node; }}
          width={window.innerHeight / 2}
          height={window.innerWidth * 0.7}
          style={{ marginTop: 20, marginLeft: 20 }}
        />
      </div>
    );
  }
}
