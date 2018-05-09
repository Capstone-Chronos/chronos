import React from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import store, { loadDefaultData } from '../store/index';
import { connect } from 'react-redux';
import { GROUPED_BAR_CHART } from '@blueprintjs/icons/lib/esm/generated/iconNames';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    store.dispatch(loadDefaultData());
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const { data, size } = this.props;
    const node = this.node;
    console.log(this.props);
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

  handleChange(evt) {
    this.setState({ tempVal: evt.target.value });
    console.log(evt.target.value);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({
      data: this.state.data.concat(+this.state.tempVal),
      tempVal: ''
    });
    console.log('submitted');
    console.log(this.state);
  }

  render() {
    return (
      <div className="chartContainer">
        <svg
          id="barchart"
          ref={node => (this.node = node)}
          width={500}
          height={500}
        />
        <div className="updateForm">
          <form onSubmit={this.handleSubmit}>
            <input label="data" onChange={this.handleChange} />
            <button type="submit" value="Submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.BarChart.data
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
