import React from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import store, { loadDefaultData } from '../store/index';
import { connect } from 'react-redux';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
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
    const size = [window.innerWidth * 0.7, window.innerHeight / 2];
    const node = this.node;
    const dataMax = max(data ? data : [0]);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, size[1]]);
    select(node)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    select(node)
      .selectAll('rect')
      .data(data)
      .exit()
      .remove();

    select(node)
      .selectAll('rect')
      .data(data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 25)
      .attr('y', d => size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25);
  }

  render() {
    console.log('barChart');
    return (
      <div className="chartContainer">
        <svg
          id="barchart"
          ref={node => (this.node = node)}
          width={window.innerHeight / 2}
          height={window.innerWidth * 0.7}
          style={{ marginTop: 20, marginLeft: 20 }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.barChart.data
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
