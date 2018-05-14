import { postBarChartToDatabase } from '../database/barChart';

const initialState = {
  data: [],
  size: 0,
  tempVal: 0,
  barSpacing: 5,
  chartId: '',
  isSaved: ''
};

const LOAD_DEFAULT_DATA = 'LOAD_DEFAULT_DATA';
const ADD_DATA_POINT = 'ADD_DATA_POINT';
const SET_BAR_DATA = 'SET_BAR_DATA';
const SAVE_BAR_CHART = 'SAVE_BAR_CHART';

const defaultData = [3, 7, 5, 10];

export const loadDefaultData = () => ({
  type: LOAD_DEFAULT_DATA,
  data: defaultData
});
export const addDataPoint = point => {
  return {
    type: ADD_DATA_POINT,
    point
  };
};
export const setBarData = data => {
  return {
    type: SET_BAR_DATA,
    data
  };
};
const saveBarChart = success => {
  type: SAVE_BAR_CHART, success;
};

// THUNKS

export const saveBarChartThunk = data => {
  return dispatch => {
    postBarChartToDatabase(data)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEFAULT_DATA:
      console.log(action.data, 'DEFAULT DATA PUT IN STORE');
      return { ...state, data: action.data };
    case ADD_DATA_POINT:
      return {
        ...state,
        data: state.data.concat([action.point]),
        isSaved: false
      };
    case SET_BAR_DATA:
      return { ...state, data: action.data };
    case SAVE_BAR_CHART:
      return { ...state, isSaved: true };
    default:
      return state;
  }
}
