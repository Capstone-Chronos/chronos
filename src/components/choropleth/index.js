import React from 'react';
import { select } from 'd3-selection';
import {  json as readJSON } from 'd3';
import { mesh, feature } from 'topojson';
import { geoPath } from 'd3-geo';

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
    readJSON('https://d3js.org/us-10m.v1.json', (err, us) => {
      if (err) throw err;

      const node = this.node;
      const states = us.objects.states;
      const geoData = feature(us, states).features;
      const path = geoPath();
      const lines = path(mesh(us, states, (a, b) => (a !== b)));

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
    });
  }

  render() {
    console.log('Rendering choropleth of the US states....');

    return (
      <div className="chartContainer">
        <svg
          id="choropleth"
          ref={node => { this.node = node; }}
          width="960"
          height="600"
          style={{ marginTop: 20, marginLeft: 20 }}
        />
        <p>Dinner.</p>
      </div>
    );
  }
}
