import React from 'react';
import SingleSelection from './SingleSelection';

const timelines = [
  { id: 1, name: 'Bar Chart', route: 'edit/barchart' },
  { id: 2, name: 'Pie Chart', route: 'piechart' },
  { id: 3, name: 'Sankey Diagram', route: 'sankey' }
];

export default class Allcharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: timelines,
      userProjects: timelines,
      allCharts: timelines
    };
  }

  componentDidMount() {
    // this.props.fetchAllTimelines();
    // this.props.fetchTemplates();
    // this.props.fetchUserProjects();
  }

  render() {
    let { templates, userProjects, allCharts } = this.state;
    const chart = {
      id: 123,
      title: 'MySankey',
      url: '/1/sanket'
    };
    return (
      <div className="chart-group-containter">
        <div>
          <h2 className="title">Create Project from Template</h2>
          <div className="grid-list">
            {templates.map(timeline => (
              <SingleSelection
                key={timeline.id}
                name={timeline.name}
                url={timeline.route}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="title">My Saved Projects</h2>
          <div className="grid-list">
            {userProjects
              .reverse()
              .map(timeline => (
                <SingleSelection
                  key={timeline.id}
                  name={timeline.name}
                  url={timeline.route}
                />
              ))}
          </div>
        </div>
        <div>
          <h2 className="title">Published Charts</h2>
          <div className="grid-list">
            {allCharts.map(timeline => (
              <SingleSelection
                key={timeline.id}
                name={timeline.name}
                url={`/show/${timeline.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
