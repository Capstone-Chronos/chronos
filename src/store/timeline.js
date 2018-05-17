import { userRef, chartsRef } from '../base';
import firebase from 'firebase';
import history from '../routes/history';
import {
  saveNewChart,
  fetchChartById,
  saveExistingChart
} from '../database/charts';

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
      {
        id: 0,
        name: 'New Years 2016',
        date: '2016, 1, 1',
        color: null,
        radius: 30,
        height: 60,
        description: '',
        imgUrl: '',
        vidUrl: ''
      },
      {
        id: 1,
        name: 'My birthday',
        date: '2016, 3, 1',
        color: null,
        radius: 15,
        height: 250,
        description: '',
        imgUrl: '',
        vidUrl: ''
      },
      {
        id: 2,
        name: 'First Day of Summer',
        date: '2016, 6, 21',
        color: null,
        radius: 60,
        height: 400,
        description: '',
        imgUrl: '',
        vidUrl: ''
      },
      {
        id: 3,
        name: 'New Years 2016',
        date: '2017, 1, 1',
        color: null,
        radius: 70,
        height: 330,
        description: '',
        imgUrl: '',
        vidUrl: ''
      }
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
    dates: [{
      id: 3,
      name: '',
      date: '',
      color: null,
      radius: 0,
      height: 0,
      description: '',
      imgUrl: '',
      vidUrl: ''
    }]
  }
};

const initialState = defaultData;

// Action Types
const UPDATE_EVENTS = 'UPDATE_EVENTS';
const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
const UPDATE_WIDTH = 'UPDATE_WIDTH';
const CLEAR_DATA = 'CLEAR_DATA';
const UPDATE_RANGE = 'UPDATE_RANGE';

const UPDATE_DATA = 'UPDATE_DATA';
const DELETE_USER_CHART = 'DELETE_USER_CHARTS';
const SET_TIMELINE_TITLE = 'SET_TIMELINE_TITLE';
const SET_TIMELINE_ID = 'SET_CHART_ID';
const SET_CHART = 'SET_CHART';
const UPDATE_TITLE = 'UPDATE_TITLE';

//ACTION CREATORS
export const updateEvents = dates => ({
  type: UPDATE_EVENTS,
  dates
});
export const updateTimelineHeight = height => ({
  type: UPDATE_HEIGHT,
  height
});
export const updateTimelineWidth = width => ({
  type: UPDATE_WIDTH,
  width
});
export const clearTimelineData = () => ({
  type: CLEAR_DATA
});
export const updateTimelineRange = (start, end) => ({
  type: UPDATE_RANGE,
  start,
  end
});
export const setTimelineChart = chart => ({
  type: SET_CHART,
  chart
});

export const loadDefaultData = () => ({
  type: UPDATE_DATA,
  data: defaultData
});

export const importDataFromFile = data => ({
  type: UPDATE_DATA,
  data
});

export const setTimelineTitle = title => ({
  type: SET_TIMELINE_TITLE,
  title
});

export const setTimelineId = chartId => ({
  type: SET_TIMELINE_ID,
  chartId
});

export const updateTitle = title => ({
  type: UPDATE_TITLE,
  title
});

//THUNKS
export const saveTimelineThunk = (data, title, chartType) => {
  return dispatch => {
    saveNewChart(data, title, chartType)
      .then(chartId => {
        dispatch(setTimelineId(chartId));
        dispatch(setTimelineTitle(title));
        history.push(`/edit/timeline/${chartId}/${title}`);
      })
      .catch(err => console.error(err));
  };
};

export const saveExistingTimelineThunk = (data, chartId) => {
  return dispatch => {
    saveExistingChart(data, chartId);
  };
};

export const fetchTimelineByIdThunk = chartId => {
  return dispatch => {
    fetchChartById(chartId).then(timeline => {
      console.log('timeline return by Fetch Thunk', timeline);
      let action = setTimelineChart(timeline);
      dispatch(action);
    });
  };
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EVENTS:
      return { ...state, data: { ...state.data, dates: action.dates } };
    case UPDATE_HEIGHT:
      return { ...state, data: { ...state.data, height: action.height } };
    case UPDATE_WIDTH:
      return { ...state, data: { ...state.data, width: action.width } };
    case CLEAR_DATA:
      return { ...state, data: { ...state.data, dates: [] } };
    case UPDATE_RANGE:
      return {
        ...state,
        data: { ...state.data, start: action.start, end: action.end }
      };
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
