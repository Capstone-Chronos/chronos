import React from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

export default class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      size: this.props.size,
      tempVal: 0
    }
    this.createBarChart = this.createBarChart.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])
    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
  }

  handleChange(evt) {
    this.setState({ data: evt.target.value })
    console.log(evt.target.value)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ data: this.state.data.concat([this.state.tempVal]), tempVal: "" })
    console.log("submitted")
  }

  render() {
    return <div class="chartContainer">
      <svg id="barchart" ref={node => this.node = node}
        width={500} height={500}>
      </svg>
      <div class="updateForm">
        <form onSubmit={this.handleSubmit}>
          <input label="data" onChange={this.handleChange}></input>
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    </div>
  }
}

