import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleSelection from './SingleSelection';
import { Card } from 'semantic-ui-react';

// import { fetchTimelines } from '../store';

const timelines = [{id: 1, name: 'timeline 1'}, {id: 2, name: 'timeline 2'}, {id: 3, name: 'timeline 3'}];

export default class AllTimelines extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timelines: [{id: 1, name: 'timeline 1'}, {id: 2, name: 'timeline 2'}, {id: 3, name: 'timeline 3'}]
    };
  }

  componentDidMount() {
    this.props.fetchAllTimelines();
  }

  render() {
    console.log('Loaded');
    return (
      <div>
        <h2>Select a Timeline to View</h2>
        <Card.Group>
          {timelines.map(timeline => (
            <SingleSelection
              key={timeline.id}
              name={timeline.name}
              url={`/timelines/${timeline.id}`}
            />
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

