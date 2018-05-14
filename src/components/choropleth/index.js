import React from 'react';
import renderMap from './renderMap';
import { mapWidth, mapHeight } from './constants';

export default class Choropleth extends React.Component {
  constructor(props) {
    super(props);
    this.renderMap = renderMap.bind(this);
  }

  componentDidMount() {
    this.renderMap();
    this.states = this.node.children
    console.log('Nodes:');
    console.log(this.states);

  }

  componentDidUpdate() {
    this.renderMap();
  }

  render() {
    console.log('Rendering choropleth of the US states....');

    return (
      <div className="chartContainer">
        <svg
          id="choropleth"
          ref={node => { this.node = node; }}
          width={mapWidth}
          height={mapHeight}
          style={{ marginTop: 20, marginLeft: 20 }}
        />
      </div>
    );
  }
}
