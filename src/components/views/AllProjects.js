import React from 'react';
import { SingleSelection } from '../../components';

const timelines = [
  { id: 1, name: 'Bar Chart', type: 'barchart' },
  { id: 2, name: 'Pie Chart', type: 'piechart' },
  { id: 3, name: 'Sankey Diagram', type: 'sankey' }
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
    // this.props.fetchAllProjects();
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
                type={timeline.type}
                url={`/edit/${timeline.type}`}
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
                  type={timeline.type}
                  url={`/view/${timeline.type}/${timeline.name}`}
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
                type={timeline.type}
                url={`/show/${timeline.type}/${timeline.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
