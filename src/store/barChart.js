import { postBarChartToDatabase, putBarChart } from '../database/barChart';
import history from '../routes/history';

const initialState = {
  data: [],
  chartId: '',
  title: '',
  isSaved: '',
  size: 0,
  barSpacing: 5,
  isPublished: false
};

const LOAD_DEFAULT_DATA = 'LOAD_DEFAULT_DATA';
const ADD_DATA_POINT = 'ADD_DATA_POINT';
const SET_BAR_DATA = 'SET_BAR_DATA';
const SAVE_BAR_CHART = 'SAVE_BAR_CHART';
const SET_CHART_ID = 'SET_CHART_ID';
const SET_BAR_TITLE = 'SET_BAR_TITLE';

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
  return { type: SET_BAR_DATA, data };
};
const saveBarChart = () => {
  return { type: SAVE_BAR_CHART };
};
const setChartId = chartId => {
  return { type: SET_CHART_ID, chartId };
};
const setBarTitle = title => {
  return { type: SET_BAR_TITLE, title };
};

// THUNKS

export const saveBarChartThunk = (data, title) => {
  return dispatch => {
    postBarChartToDatabase(data, title)
      .then(chartId => {
        dispatch(saveBarChart());
        dispatch(setBarTitle(title));
        dispatch(setChartId(chartId));
        history.push(`/edit/barchart/${chartId}/${title}`);
      })
      .catch(err => console.error(err));
  };
};

export const updateBarChartThunk = (data, chartId) => {
  return dispatch => {
    putBarChart(data, chartId)
      .then(() => {
        dispatch(saveBarChart());
      })
      .catch(err => console.error(err));
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEFAULT_DATA:
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
    case SET_CHART_ID:
      return { ...state, chartId: action.chartId };
    case SET_BAR_TITLE:
      return { ...state, title: action.title };
    default:
      return state;
  }
}
