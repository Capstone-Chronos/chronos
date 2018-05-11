import React from 'react';
import SingleSelection from './SingleSelection';

const charts = [
  { id: 1, name: 'Bar Chart', url: '/' },
  { id: 2, name: 'chart 2' },
  { id: 3, name: 'chart 3' }
];

export default class Allcharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charts: [
        { id: 1, name: 'Bar Chart', route: '/edit/barchart' },
        { id: 1, name: 'Pie Chart', route: '/piechart' },
        { id: 3, name: 'Sankey Diagram', route: '/sankey' }
      ]
    };
  }

  render() {
    let charts = this.state.charts;
    return (
      <div>
        <h2 className="title">Select a chart to View</h2>
        <div className="grid-list">
          {charts.map(chart => (
            <SingleSelection
              key={chart.id}
              name={chart.name}
              url={chart.route}
            />
          ))}
        </div>
      </div>
    );
  }
}
