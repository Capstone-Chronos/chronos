import React from 'react';
import { SingleSelection } from '../../components';
import firebase from 'firebase';
import { app } from '../../base';
import { connect } from 'react-redux';
import store, {
  loadDefaultData,
  clearData,
  saveChart,
  updateChart,
  getUserCharts,
  getPublishedCharts
} from '../../store';
import { fetchChartById } from '../../database/sankeyChart';

const templates = [
  { id: 1, name: 'Bar Chart', type: 'barchart' },
  { id: 2, name: 'Pie Chart', type: 'piechart' },
  { id: 3, name: 'Sankey Diagram', type: 'sankey' },
  { id: 4, name: 'Timeline', type: 'timeline' },
  { id: 5, name: 'Choropleth', type: 'choropleth' }
];

export class AllProjects extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;

    this.props.getUserCharts();
    this.props.getPublishedCharts();

  }

  render() {
    return (
      <div className="chart-group-containter">
        <div>
          <h2 className="title">Create Project from Template</h2>
          <div className="grid-list">
            {templates.map(template => (
              <SingleSelection
                key={template.name}
                name={template.name}
                type={template.type}
                description="THIS IS a placehold description for our charts...."
                url={`/edit/${template.type}`}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="title">My Saved Projects</h2>
          <div className="grid-list">

            {!this.props.userCharts
              ? 'You currently have no saved charts'
              : Object.values(this.props.userCharts)
                .filter(chart => chart.uid === this.props.userId)
                .map(chart => {
                  return (
                    <div onClick={fetchChartById(chart.chartId)}>
                      <SingleSelection
                        key={chart.chartId}
                        id={chart.chartId}
                        name={chart.title}
                        type={chart.chartType}
                        description="THIS IS a placehold description for our charts...."
                        url={`/view/${chart.chartType}/${chart.chartId}`}
                      />
                    </div>
                  );
                })}

          </div>
        </div>
        <div>
          <h2 className="title">Published Charts</h2>
          <div className="grid-list">

            {!this.props.publishedCharts
              ? 'There are currently no published charts'
              : Object.values(this.props.publishedCharts)
                .filter(chart => chart.isPublished === true)
                .map(chart => {

                  return (
                    <div onClick={fetchChartById(chart.chartId)}>
                      <SingleSelection
                        key={chart.chartId}
                        name={chart.title}
                        type={chart.chartType}
                        description="THIS IS a placehold description for our charts...."
                        url={`/show/${chart.chartType}/${chart.chartId}`}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => {
  return {
    userId: storeState.user.id,
    userCharts: storeState.allCharts.userCharts,
    publishedCharts: storeState.allCharts.publishedCharts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserCharts: () => {
      const action = getUserCharts();
      dispatch(action);
    },
    getPublishedCharts: () => {
      const action = getPublishedCharts();
      dispatch(action);
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects);
