import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import _ from 'lodash';
import { scaleTime } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { timeParse } from 'd3-time-format';
import { connect } from 'react-redux';

export default class Timeline extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     radius: 5,
  //     dates: []
  //   };
  // }

  // componentDidMount() {
  //   if (this.props.data) {
  //     this.setState({
  //       dates: this.props.data.dates,
  //       radius: this.props.data.radius,
  //       start: this.props.data.start,
  //       end: this.props.data.end,
  //       width: this.props.data.width,
  //       height: this.props.data.height
  //     });
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data) {
  //     this.setState({
  //       dates: nextProps.data.dates,
  //       radius: nextProps.data.radius,
  //       start: nextProps.data.start,
  //       end: nextProps.data.end,
  //       width: nextProps.data.width,
  //       height: nextProps.data.height
  //     });
  //   }
  // }

  render() {
    if (!this.props.data) return <div />;
    let timelineEvents = this.props.data.dates || [];
    // ========================================================================
    // Set units, margin, sizes
    // ========================================================================
    var margin = { top: 10, right: 0, bottom: 10, left: 0 };
    var width = this.props.data.width - margin.left - margin.right;
    var height = this.props.data.height - margin.top - margin.bottom;
    var format = timeParse('%Y,%m,%d');
    var start = format(this.props.data.start);
    var end = format(this.props.data.end);

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
      .domain([start, end])
      .range([20, width - 20]);

    var xAxis = d3.svg.axis().scale(timeScale);

    // Attach event markers to DOM
    svg
      .append('g')
      .selectAll('circle')
      .data(timelineEvents)
      .enter()
      .append('circle')
      .on('click', this.props.openModal)
      .attr('transform', d => `translate(0, ${-d.height || 40})`)
      .attr('class', 'time-event')
      .attr('fill', d => d.color)
      .attr('r', d => d.radius || 20)
      .attr('cy', 8)
      .attr('cx', function(d) {
        var newDate = new Date(d.date);
        return timeScale(newDate);
      })
      .append('title')
      .text(d => {
        let newDate = new Date(d.date).toDateString();
        return `${d.name} \n${newDate}`}
      )

    //Attach labels to event markers
    // svg
    //   .append('g')
    //   .selectAll('text')
    //   .data(timelineEvents)
    //   .enter()
    //   .append('text')
    //   .attr('transform', d => `translate(0, ${(-d.height + d.radius) || 40})`)
    //   .attr('x', function(d) {
    //     let newDate = new Date(d.date).toLocaleDateString;
    //     return timeScale(newDate)
    //   })
    //   .text(function(d) {
    //     return d.name;
    //   });

    // Create xAxis by passing in timeScale and attach to DOM
    svg
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height / 5 * 4 + ')')
      .attr('width', width + margin.left + margin.right)
      .append('g')
      .call(xAxis);

    return svgNode.toReact();
  }
}
