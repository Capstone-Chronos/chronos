import { userRef, chartsRef } from '../base';
import firebase from 'firebase';
import history from '../routes/history';
import { saveChart } from '../database/sankeyChart';

let defaultData = {
  chartId: '',
  title: 'Energy Use in the UK',
  width: 1000,
  height: 800,
  data: {
  }
};

let empty = {
  
};

const initialState = defaultData;

// Action Types
const UPDATE_DATA = 'UPDATE_DATA';
const IMPORT_DATA = 'IMPORT_DATA';
const GET_ONE_CHART = 'GET_CHART';
const GET_USER_CHARTS = 'GET_USER_CHARTS';
const DELETE_USER_CHART = 'DELETE_USER_CHARTS';

const SET_CHART_ID = 'SET_CHART_ID';
const SET_MAP_TITLE = 'SET_MAP_TITLE';
const SET_CHART = 'SET_CHART';
const UPDATE_TITLE = 'UPDATE_TITLE'

//ACTION CREATORS
export const loadDefaultData = () => ({
  type: UPDATE_DATA,
  data: defaultData
});

export const importData = data => ({
  type: UPDATE_DATA,
  data: data
});

export const clearData = () => ({
  type: UPDATE_DATA,
  data: empty
});

export const setMapTitle = title => ({
  type: SET_MAP_TITLE,
  title
});

export const setMapId = chartId => ({
  type: SET_CHART_ID,
  chartId
});

export const setChart = chart => ({
  type: SET_CHART,
  chart
});

export const updateTitle = title => ({
  type: UPDATE_TITLE,
  title
})



//THUNKS
export const saveMapChartThunk = (data, title) => {
  return dispatch => {
    saveChart(data, title)
      .then(chartId => {
        dispatch(setMapTitle(title));
        dispatch(setMapId(chartId));
        history.push(`/edit/map/${chartId}/${title}`);
      })
      .catch(err => console.error(err));
  };
};


// Thunk creators

//Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return { ...state, title: action.title }
    case UPDATE_DATA:
      defaultData = action.data;
      return { ...state, data: action.data };
    case DELETE_USER_CHART:
      return { ...state, data: empty.data};
    case SET_CHART_ID:
      return { ...state, chartId: action.chartId };
    case SET_CHART:
      return action.chart;
    default:
      return state;
  }
}
