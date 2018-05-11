import React from 'react';
import SingleSelection from './SingleSelection';
// import { Card } from 'semantic-ui-react';
// import { fetchTimelines } from '../store';

const timelines = [
  { id: 1, name: 'Bar Chart', url: '/' },
  { id: 2, name: 'timeline 2' },
  { id: 3, name: 'timeline 3' }
];

export default class AllTimelines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelines: [
        { id: 1, name: 'Bar Chart', route: 'barchart' },
        { id: 1, name: 'Pie Chart', route: 'piechart' },
        { id: 3, name: 'Sankey Diagram', route: 'sankey' }
      ]
    };
  }

  render() {
    let timelines = this.state.timelines;
    return (
      <div>
        <h2 className="title">Select a Timeline to View</h2>
        <div className="grid-list">
          {timelines.map(timeline => (
            <SingleSelection
              key={timeline.id}
              name={timeline.name}
              url={timeline.route}
            />
          ))}
        </div>
      </div>
    );
  }
}
