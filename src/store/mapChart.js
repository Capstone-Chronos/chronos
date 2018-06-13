import { userRef, chartsRef, databaseRef } from '../base';
import firebase from 'firebase';
import history from '../routes/history';
import { fetchChartById, saveNewChart } from '../database/charts';

let initialState = {
  chartId: '',
  chartType: 'Choropleth',
  title: 'Choropleth',
  data: {
    json: 'https://d3js.org/us-10m.v1.json',
    width: 1000,
    height: 800
  },
  stateColors: {}
};

let empty = initialState;

// Action Types
const UPDATE_COLORS = 'UPDATE_COLORS';
const SET_MAP_ON_LOAD = 'SET_MAP_ON_LOAD';

const UPDATE_MAP_DATA = 'UPDATE_MAP_DATA';
const IMPORT_DATA = 'IMPORT_DATA';
const GET_ONE_CHART = 'GET_CHART';
const GET_USER_CHARTS = 'GET_USER_CHARTS';
const DELETE_USER_CHART = 'DELETE_USER_CHARTS';
const LOAD_DEFAULT_DATA = 'LOAD_DEFAULT_DATA';

const SET_CHART_ID = 'SET_CHART_ID';
const SET_MAP_TITLE = 'SET_MAP_TITLE';
const SET_CHART = 'SET_CHART';
const UPDATE_TITLE = 'UPDATE_TITLE';
const CLEAR_DATA = 'CLEAR_DATA';
const SET_HEIGHT_WIDTH = 'SET_HEIGHT_WIDTH';

//ACTION CREATORS
export const updateMapColors = singleState => ({
  type: UPDATE_COLORS,
  singleState
});
export const setMapOnLoad = map => ({
  type: SET_MAP_ON_LOAD,
  map
});

export const loadDefaultData = () => ({
  type: UPDATE_MAP_DATA,
  data: initialState
});

export const importMapData = data => ({
  type: UPDATE_MAP_DATA,
  data: data
});

export const clearMapData = () => ({
  type: CLEAR_DATA
});

export const setMapTitle = title => ({
  type: SET_MAP_TITLE,
  title
});

export const setMapId = chartId => ({
  type: SET_CHART_ID,
  chartId
});

export const setMapChart = chart => ({
  type: SET_CHART,
  chart
});

export const updateTitle = title => ({
  type: UPDATE_TITLE,
  title
});

export const setHeightWidth = (heightInput, widthInput) => {
  let height = isNaN(Number(heightInput)) ? null : Number(heightInput);
  let width = isNaN(Number(widthInput)) ? null : Number(widthInput);

  return {
    type: SET_HEIGHT_WIDTH,
    height,
    width
  };
}

export const saveNewMapThunk = async (data, title) => {
  let newChartKey;
  try {
    let uid = firebase.auth().currentUser.uid;
    newChartKey = await userRef
      .child(uid)
      .child('charts')
      .push().key;
    const chartInfo = {
      chartType: 'Choropleth',
      isPublished: false,
      title,
      data,
      uid,
      chartId: newChartKey
    };
    let updates = {};
    updates[`users/${uid}/charts/${newChartKey}`] = newChartKey;
    updates[`charts/${newChartKey}`] = chartInfo;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
  return newChartKey;
};

//THUNKS
export const saveMapChartThunk = (data, title) => {
  return dispatch => {
    saveNewChart(data, title, 'Choropleth')
      .then(chartId => {
        dispatch(setMapTitle(title));
        dispatch(setMapId(chartId));
        history.push(`/edit/map/${chartId}/${title}`);
      })
      .catch(err => console.error(err));
  };
};

// export const saveExistingMapThunk = (data, chartId) => {
//   return dispatch => {
//     saveExistingChart(data, chartId);
//   };
// };

export const fetchMapByIdThunk = chartId => {
  return dispatch => {
    fetchChartById(chartId).then(map => {
      console.log('Map return by Fetch Thunk', map);
      let action = setMapOnLoad(map);
      dispatch(action);
    });
  };
};

//Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COLORS:
      return {
        ...state,
        stateColors: {
          ...state.stateColors,
          ...action.singleState
        }
      };
    case UPDATE_TITLE:
      return { ...state, title: action.title };
    case UPDATE_MAP_DATA:
      return { ...state, data: { ...state.data, ...action.data } };
    case DELETE_USER_CHART:
      return {
        ...state,
        data: empty.data.json,
        stateColors: empty.stateColors
      };
    case SET_CHART_ID:
      return { ...state, chartId: action.chartId };
    case SET_CHART:
      return action.chart;
    case LOAD_DEFAULT_DATA:
      return initialState;
    case CLEAR_DATA:
      return {
        ...state,
        stateColors: {}
      };
    case SET_HEIGHT_WIDTH:
      return {
        ...state,
        data: {
          ...state.data,
          height: action.height || state.data.height,
          width: action.width || state.data.width
        }
      };
    default:
      return state;
  }
}
