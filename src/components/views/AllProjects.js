import React from 'react';
import { SingleSelection } from '../../components';
import firebase from 'firebase';
import { app } from '../../base';
import { connect } from 'react-redux';
import store, {
  loadDefaultData,
  clearData,
  getUserCharts,
  getPublishedCharts
} from '../../store';
import { fetchChartById } from '../../database/charts';

const templates = [
  { id: 1, name: 'Bar Chart', type: 'Bar Chart' },
  { id: 2, name: 'Pie Chart', type: 'Pie Chart' },
  { id: 3, name: 'Sankey Diagram', type: 'Sankey' },
  { id: 4, name: 'Timeline', type: 'Timeline' },
  { id: 5, name: 'Map', type: 'Map' }
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

  getImageUrl(chartType) {
    switch (chartType) {
      case 'Bar Chart':
        return 'https://freebieslearning.net/wp-content/uploads/2017/05/sf-zoo-vs-la-zoo.png';
      case 'Pie Chart':
        return 'https://www.highcharts.com/images/docs/pie.png';
      case 'Sankey Diagram':
        return 'https://i.imgur.com/hXSOfvJm.png';
      case 'Timeline':
        return 'https://i.imgur.com/eQvaOqSm.png';
      case 'Map':
        return 'https://i.imgur.com/kiPKzS4m.png';
      case 'Choropleth':
        return 'https://i.imgur.com/kiPKzS4m.png';
      case 'Sankey':
        return 'https://i.imgur.com/hXSOfvJm.png';
    }
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
                description="THIS IS a placeholder description for our charts...."
                url={`/edit/${template.type.toLowerCase()}`}
                imgUrl={this.getImageUrl(template.type)}
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
                    <div
                      onClick={fetchChartById(chart.chartId)}
                      key={chart.chartId + '1'}
                    >
                      <SingleSelection
                        id={chart.chartId}
                        name={chart.title}
                        type={chart.chartType}
                        description="THIS IS a placeholder description for our charts...."
                        url={`/view/${chart.chartType.toLowerCase()}/${
                          chart.chartId
                          }`}
                        imgUrl={this.getImageUrl(chart.chartType)}
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
                    <div
                      onClick={fetchChartById(chart.chartId)}
                      key={chart.chartId + '2'}
                    >
                      <SingleSelection
                        name={chart.title}
                        type={chart.chartType}
                        description="THIS IS a placeholder description for our charts...."
                        url={`/show/${chart.chartType.toLowerCase()}/${
                          chart.chartId
                          }`}
                        imgUrl={this.getImageUrl(chart.chartType)}
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
    userId: storeState.user.uid,
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
