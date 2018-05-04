import React, { PropTypes, Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux'
import { extent as d3ArrayExtent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { line as d3Line } from 'd3-shape';


class CreateTimeline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageUrl: './public/assets/CreateTimelinePlaceholder.png'
    }
  }

  render () {
    return (
      <img src={this.state.imageUrl} />
    );
  }
}

export default CreateTimeline;
