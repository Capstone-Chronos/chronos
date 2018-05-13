import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import _ from 'lodash';
import { scaleTime } from 'd3-scale';
import { axisBottom } from 'd3-axis';

var myData = { dates: [{ date: new Date(2016, 0, 1) }, { date: new Date(2016, 3, 1) }, { date: new Date(2016, 6, 1) }, { date: new Date(2017, 0, 1) }] }

export default class TimeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1400,
      height: 800
    };
  }

  componentWillMount() {
    this.setState({ dates: myData.dates })
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      // nodes: nextProps.nodes,
      // links: nextProps.links
    });
  }

  render() {
    // ========================================================================
    // Set units, margin, sizes
    // ========================================================================
    var margin = { top: 10, right: 0, bottom: 10, left: 0 };
    var width = this.state.width - margin.left - margin.right;
    var height = this.state.height - margin.top - margin.bottom;

    var format = d => formatNumber(d);
    var formatNumber = d3.format(',.0f'); // zero decimal places


    var svgNode = ReactFauxDOM.createElement('div');

    var svg = d3
      .select(svgNode)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var timeScale = scaleTime()
      .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
      .range([0, 700]);

    var xAxis = d3.svg.axis()
      .scale(timeScale);

    // Attach event markers to DOM
    svg
      .append('g')
      .selectAll('circle')
      .data(this.state.dates)
      .enter()
      .append('circle')
      .attr('transform', 'translate(0,' + (-20) + ')')
      .attr('r', 5)
      .attr('cy', 8)
      .attr('cx', function (d) {
        return timeScale(d.date);
      });

    //Attach labels to event markers
    svg
      .append('g')
      .selectAll('text')
      .data(this.state.dates)
      .enter()
      .append('text')
      .attr('transform', 'translate(0,' + (-20) + ')')
      .attr('x', function (d) {
        return timeScale(d.date);
      })
      .text(function (d) {
        return d.date.toDateString();
      });

    //Create xAxis by passing in timeScale and attach to DOM
    svg
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (height / 2) + ')')
      .attr('width', width + margin.left + margin.right)
      .append('g')
      .call(xAxis);

    return svgNode.toReact();
  }
}
