import React from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import store, { loadDefaultData } from '../../store';
import { connect } from 'react-redux';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width: window.innerWidth * 0.7,
      height: window.innerHeight * 0.7,
      preserveAspectRatio: 'none' //preserve Aspect ratio
    };
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    store.dispatch(loadDefaultData());
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const { data } = this.props;
    const { x, y, width, height, preserveAspectRatio } = this.state;
    const padding = 30;
    const node = this.node;
    const dataMax = data ? Math.max(...data) : 100;
    const barPadding = this.props.barSpacing;

    // Create Scales
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, height - padding * 4]);

    // ========================================================================
    // Initialize and append the svg canvas to faux-DOM
    // ========================================================================
    const svgNode = ReactFauxDOM.createElement('div');

    const svg = d3
      .select(svgNode)
      .append('svg')
      .attr('className', 'svg-content')
      .attr('viewBox', `${x} ${y} ${width} ${height}`)
      .attr('preserveAspectRatio', preserveAspectRatio);

    // Add Bars
    const bars = svg
      .append('g')
      .selectAll('.bar')
      .data(data)
      .enter();

    bars
      .append('rect')
      .style('fill', '#fe9922')
      .style('stroke', '#252525')
      .attr('className', 'node')
      .attr(
        'x',
        (d, i) => padding * 2 + i * (width - padding * 4) / data.length
      )
      .attr('y', d => {
        console.log(d);
        return height - padding * 2 - yScale(d);
      }) // Padding plus
      .attr('height', d => yScale(d))
      .attr('width', (width - padding * 4) / data.length - barPadding);

    // Add border
    svg
      .append('rect')
      .attr('x', padding)
      .attr('y', padding)
      .attr('height', height - padding * 2)
      .attr('width', width - padding * 2)
      .style('stroke', 'lightgrey')
      .style('fill', 'none')
      .style('stroke-width', 4);

    return svgNode.toReact();
  }

  render() {
    // return this.createBarChart();
    const { x, y, width, height, preserveAspectRatio } = this.state;
    return (
      <div className="svg-container">
        <div className="svg-centered">{this.createBarChart()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.barChart.data,
  barSpacing: state.barChart.barSpacing
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
