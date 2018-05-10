import React from 'react';
import BarChart from './BarChart';
import BarChartTools from './BarChartTools';
import Toolbar from './Toolbar';

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let tools = [
      {
        clickHandler: function() {
          alert('It works!');
        },
        name: 'Call Alert'
      }
    ];
    return (
      <div className="chartContainer">
        <div>
          <BarChart />
        </div>
        <div>
          <BarChartTools />
        </div>
        {/* <Toolbar tools={tools} /> */}
      </div>
    );
  }
}

export default ChartContainer;
