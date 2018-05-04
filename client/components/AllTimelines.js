import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { fetchTimelines } from '../store';

const timelines = [{id: 1, name: 'timeline 1'}, {id: 2, name: 'timeline 2'}, {id: 3, name: 'timeline 3'}];

export default class AllTimelines extends React.Component {
  constructor(props){
    super(props);
    // this.state = {
    //   timelines: [{id: 1, name: 'timeline 1'}, {id: 2, name: 'timeline 2'}, {id: 3, name: 'timeline 3'}]
    // };
  }

  //   componentDidMount() {
  //     this.props.fetchAllTimelines();
  //   }

  render() {
    return (
      <div>
        <h2>Select a Timeline to View</h2>
        <ul>
          {
            timelines.map(timeline => {
              return (
                <li key={timeline.id}>
                  <Link to={`/timelines/${timeline.id}`}>{timeline.name}</Link>
                </li>
              );
            })
          }
        </ul>
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

