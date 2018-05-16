import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import _ from 'lodash';
import { scaleTime } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { timeParse } from 'd3-time-format';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: 5,
      dates: []
    };
  }

  componentWillMount() {
    this.setState({
      dates: this.props.data.dates,
      radius: this.props.data.radius,
      start: this.props.data.start,
      end: this.props.data.end,
      width: this.props.data.width,
      height: this.props.data.height
    })
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      dates: this.props.data.dates,
      radius: this.props.data.radius,
      start: this.props.data.start,
      end: this.props.data.end,
      width: this.props.data.width,
      height: this.props.data.height
    });
  }


  render() {
    console.log(this.props)
    console.log("Timeline state", this.state)
    // ========================================================================
    // Set units, margin, sizes
    // ========================================================================
    var margin = { top: 10, right: 0, bottom: 10, left: 0 };
    var width = this.state.width - margin.left - margin.right;
    var height = this.state.height - margin.top - margin.bottom;
    var format = timeParse("%Y,%m,%d")
    var start = format(this.state.start)
    var end = format(this.state.end)
    var continuousData = this.state.continuousData

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

    var xAxis = d3.svg.axis()
      .scale(timeScale);

    // Attach event markers to DOM
    svg
      .append('g')
      .selectAll('circle')
      .data(this.state.dates)
      .enter()
      .append('circle')
      .on('click', this.props.openModal)
      .attr('transform', 'translate(0,' + (-40) + ')')
      .attr('class', 'time-event')
      .attr('r', this.state.radius)
      .attr('cy', 8)
      .attr('cx', function (d) {
        var newDate = new Date(d.date)
        return timeScale(newDate);
      });

    //Attach labels to event markers
    svg
      .append('g')
      .selectAll('text')
      .data(this.state.dates)
      .enter()
      .append('text')
      .attr('transform', 'translate(0,' + (-40) + ')')
      .attr('x', function (d) {
        var newDate = new Date(d.date)
        return timeScale(newDate);
      })
      .text(function (d) {
        return d.name;
      });

    // Create xAxis by passing in timeScale and attach to DOM
    svg
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (height / 2) + ')')
      .attr('width', width + margin.left + margin.right)
      .append('g')
      .call(xAxis);

    // Create area chart overlay
    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var area = d3.area()
      .x(function (d) {
        var newDate = new Date(d.date)
        return timeScale(newDate);
      })
      .y1(function (d) { return y(d.close); });

    x.domain(d3.extent(data, (function (d) {
      var newDate = new Date(d.date)
      return timeScale(newDate);
    })))
    y.domain([0, d3.max(data, function (d) { return d.close; })]);
    area.y0(y(0));

    svg.append("path")
      .datum(data)
      .attr("fill", "steelblue")
      .attr("d", area);

    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

    return svgNode.toReact();
  }
}
