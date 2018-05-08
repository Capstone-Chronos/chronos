import history from '../routes/history';
import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_TIMELINES = 'GET_TIMELINES';

/**
 * INITIAL STATE
 */
const defaultTimelines = [
  {
    id: 1,
    name: 'timeline 1'
  },
  {
    id: 2,
    name: 'timeline 2'
  },
  {
    id: 3,
    name: 'timeline 3'
  }
];

/**
 * ACTION CREATORS
 */
const getTimelines = allTimelines => ({ type: GET_TIMELINES, allTimelines });

/**
 * THUNK CREATORS
 */
export const fetchTimelines = () => dispatch =>
  axios
    .get('/api/timelines')
    .then(res => res.data)
    .then(timelines => dispatch(getTimelines(timelines)))
    .catch(err => console.error(err));

/**
 * TRIPS SUB-REDUCER
 */
export default function(state = defaultTimelines, action) {
  switch (action.type) {
    case GET_TIMELINES:
      return action.allTimelines;
    default:
      return state;
  }
}
