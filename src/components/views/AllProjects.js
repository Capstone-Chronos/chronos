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

const timelines = [
  { id: 1, name: 'Bar Chart', type: 'barchart' },
  { id: 2, name: 'Pie Chart', type: 'piechart' },
  { id: 3, name: 'Sankey Diagram', type: 'sankey' }
];

export class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   templates: timelines,
    //   userProjects: timelines,
    //   allCharts: timelines
    // };
  }

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    console.log(userId);
    // this.props.fetchAllProjects();
    // this.props.fetchTemplates();
    // this.props.fetchUserProjects();
    // getUserCharts()
    this.props.getUserCharts();
    this.props.getPublishedCharts();
    console.log('hhhhh', this.props);
    // store.dispatch(getUserCharts());
    // getPublishedCharts()
    // store.dispatch(getPublishedCharts());
  }

  render() {
    // let { templates, userProjects, allCharts } = this.state;
    // const chart = {
    //   id: 123,
    //   title: 'MySankey',
    //   url: '/1/sanket'
    // };
    // const uid = firebase.auth().currentUser.uid;

    console.log('this.props', this.props);
    return (
      <div className="chart-group-containter">
        <div>
          <h2 className="title">Create Project from Template</h2>
          <div className="grid-list">
            {timelines.map(timeline => (
              <SingleSelection
                key={timeline.name}
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
            {!this.props.userCharts
              ? 'You currently have no saved charts'
              : this.props.userCharts
                  .filter(chart => chart.uid === this.props.userId)
                  .map(chart => (
                    <SingleSelection
                      key={chart.chartIdKey}
                      name={chart.name}
                      type={chart.chartType}
                      url={`/view/${chart.chartType}/${chart.chartIdKey}`}
                    />
                  ))}
          </div>
        </div>
        <div>
          <h2 className="title">Published Charts</h2>
          <div className="grid-list">
            {!this.props.publishedCharts
              ? 'There are currently no published charts'
              : this.props.publishedCharts
                  .filter(chart => chart.isPublished === true)
                  .map(chart => (
                    <SingleSelection
                      key={chart.name}
                      name={chart.name}
                      type={chart.chartType}
                      url={`/show/${chart.type}/${chart.id}`}
                    />
                  ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => {
  console.log(storeState, 'kkkkk');
  return {
    userId: storeState.user.user,
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
    // getUserCharts,
    // getPublishedCharts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects);
