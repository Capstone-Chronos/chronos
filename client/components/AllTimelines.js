import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleSelection from './SingleSelection';
import { Card } from 'semantic-ui-react';

// import { fetchTimelines } from '../store';

const timelines = [{ id: 1, name: 'Bar Chart', url: '/' }, { id: 2, name: 'timeline 2' }, { id: 3, name: 'timeline 3' }];

export default class AllTimelines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timelines: [{ id: 1, name: 'Bar Chart', url: "/barchart" }, { id: 1, name: 'Pie Chart', url: '/piechart' }, { id: 3, name: 'timeline 3' }]
    };
  }

  componentDidMount() {
    // this.props.fetchAllTimelines();
  }

  render() {
    console.log('Loaded');
    return (
      <div>
        <h2>Select a Timeline to View</h2>
        <Card.Group>
          {timelines.map(timeline => (
            <Link to={'/barchart'}>
              <SingleSelection
                key={timeline.id}
                name={timeline.name}
              />
            </Link>
          ))}
        </Card.Group>
      </div>
    );
  }
}


/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     timelines: state.timelines
//   };
// };

// const mapDispatch = function(dispatch) {
//   return {
//     fetchAllTimelines: function() {
//       return dispatch(fetchTimelines());
//     }
//   };
// };

// export default connect(mapState, mapDispatch)(AllTimelines);

