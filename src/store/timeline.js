import { userRef, chartsRef } from '../base';
import firebase from 'firebase';
import history from '../routes/history';
import { saveChart } from '../database/charts';

const defaultData = {
  chartId: '',
  title: 'Important Events in recent history',
  isPublished: false,
  data: {
    height: 800,
    width: 1200,
    start: '2015, 1, 1',
    end: '2018, 1, 1',
    radius: 10,
    dates: [
      { id: 0, name: 'New Years 2016', date: '2016, 1, 1', color: null, radius: 20, height: 40, description: "", imgUrl: "", vidUrl: "" },
      { id: 1, name: 'My birthday', date: '2016, 3, 1', color: null, radius: 20, height: 40, description: "", imgUrl: "", vidUrl: "" },
      { id: 2, name: 'First Day of Summer', date: '2016, 6, 21', color: null, radius: 20, height: 40, description: "", imgUrl: "", vidUrl: "" },
      { id: 3, name: 'New Years 2016', date: '2017, 1, 1', color: null, radius: 20, height: 40, description: "", imgUrl: "", vidUrl: "" }
    ]
  }
};

const empty = {
  data: {
    height: 800,
    width: 1000,
    start: '2015, 1, 1',
    end: '2018, 1, 1',
    radius: 10,
    dates: []
  }
};

const initialState = defaultData;

// Action Types
const UPDATE_DATA = 'UPDATE_DATA';
const DELETE_USER_CHART = 'DELETE_USER_CHARTS';
const SET_TIMELINE_TITLE = 'SET_TIMELINE_TITLE';
const SET_TIMELINE_ID = 'SET_CHART_ID';
const SET_CHART = 'SET_CHART';
const UPDATE_TITLE = 'UPDATE_TITLE';

//ACTION CREATORS
export const loadDefaultData = () => ({
  type: UPDATE_DATA,
  data: defaultData
});

export const importDataFromFile = data => ({
  type: UPDATE_DATA,
  data
});

export const clearTimelineData = () => ({
  type: UPDATE_DATA,
  data: empty
});

export const setTimelineTitle = title => ({
  type: SET_TIMELINE_TITLE,
  title
});

export const setTimelineId = chartId => ({
  type: SET_TIMELINE_ID,
  chartId
});

export const setTimelineChart = chart => ({
  type: SET_CHART,
  chart
});

export const updateTitle = title => ({
  type: UPDATE_TITLE,
  title
});

//THUNKS
export const saveTimelineThunk = (data, title, chartType) => {
  console.log('ERERER');
  return dispatch => {
    console.log('OVERHERE');
    saveChart(data, title, chartType)
      .then(chartId => {
        dispatch(setTimelineTitle(title));
        dispatch(setTimelineId(chartId));
        history.push(`/edit/timeline/${chartId}/${title}`);
      })
      .catch(err => console.error(err));
  };
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return { ...state, data: action.data };
    case UPDATE_TITLE:
      return { ...state, title: action.title };
    case DELETE_USER_CHART:
      return { ...state, nodes: empty.nodes, links: empty.links };
    case SET_TIMELINE_TITLE:
      return { ...state, title: action.title };
    case SET_TIMELINE_ID:
      return { ...state, chartId: action.chartId };
    case SET_CHART:
      return action.chart;
    default:
      return state;
  }
}
