import { userRef, chartsRef } from '../base';
import firebase from 'firebase';

let defaultData = {
  title: 'Energy Use in the UK',
  width: 1000,
  height: 800,
  nodes: [
    { name: "Agricultural 'waste'", node: 0, color: 'blue' },
    { name: 'Bio-conversion', node: 1 },
    { name: 'Liquid', node: 2 },
    { name: 'Losses', node: 3 },
    { name: 'Solid', node: 4 },
    { name: 'Gas', node: 5 },
    { name: 'Biofuel imports', node: 6 },
    { name: 'Biomass imports', node: 7 },
    { name: 'Coal imports', node: 8 },
    { name: 'Coal', node: 9 },
    { name: 'Coal reserves', node: 10 },
    { name: 'District heating', node: 11 },
    { name: 'Industry', node: 12 },
    { name: 'Heating and cooling - commercial', node: 13 },
    { name: 'Heating and cooling - homes', node: 14 },
    { name: 'Electricity grid', node: 15 },
    { name: 'Over generation / exports', node: 16 },
    { name: 'H2 conversion', node: 17 },
    { name: 'Road transport', node: 18 },
    { name: 'Agriculture', node: 19 },
    { name: 'Rail transport', node: 20 },
    { name: 'Lighting & appliances - commercial', node: 21 },
    { name: 'Lighting & appliances - homes', node: 22 },
    { name: 'Gas imports', node: 23 },
    { name: 'Ngas', node: 24 },
    { name: 'Gas reserves', node: 25 },
    { name: 'Thermal generation', node: 26 },
    { name: 'Geothermal', node: 27 },
    { name: 'H2', node: 28 },
    { name: 'Hydro', node: 29 },
    { name: 'International shipping', node: 30 },
    { name: 'Domestic aviation', node: 31 },
    { name: 'International aviation', node: 32 },
    { name: 'National navigation', node: 33 },
    { name: 'Marine algae', node: 34 },
    { name: 'Nuclear', node: 35 },
    { name: 'Oil imports', node: 36 },
    { name: 'Oil', node: 37 },
    { name: 'Oil reserves', node: 38 },
    { name: 'Other waste', node: 39 },
    { name: 'Pumped heat', node: 40 },
    { name: 'Solar PV', node: 41 },
    { name: 'Solar Thermal', node: 42 },
    { name: 'Solar', node: 43 },
    { name: 'Tidal', node: 44 },
    { name: 'UK land based bioenergy', node: 45 },
    { name: 'Wave', node: 46 },
    { name: 'Wind', node: 47 }
  ],
  links: [
    { source: 0, target: 1, value: 124 },
    { source: 1, target: 2, value: 1 },
    { source: 1, target: 3, value: 26 },
    { source: 1, target: 4, value: 280 },
    { source: 1, target: 5, value: 81.144 },
    { source: 6, target: 2, value: 35 },
    { source: 7, target: 4, value: 35, color: 'blue' },
    { source: 8, target: 9, value: 11.606 },
    { source: 10, target: 9, value: 63.965 },
    { source: 9, target: 4, value: 75.571 },
    { source: 11, target: 12, value: 10.639 },
    { source: 11, target: 13, value: 22.505 },
    { source: 11, target: 14, value: 46.184 },
    { source: 15, target: 16, value: 104.453 },
    { source: 15, target: 14, value: 113.726 },
    { source: 15, target: 17, value: 27.14 },
    { source: 15, target: 12, value: 342.165 },
    { source: 15, target: 18, value: 37.797 },
    { source: 15, target: 19, value: 4.412 },
    { source: 15, target: 13, value: 40.858 },
    { source: 15, target: 3, value: 56.691 },
    { source: 15, target: 20, value: 7.863 },
    { source: 15, target: 21, value: 90.008 },
    { source: 15, target: 22, value: 93.494 },
    { source: 23, target: 24, value: 40.719 },
    { source: 25, target: 24, value: 82.233 },
    { source: 5, target: 13, value: 0.129 },
    { source: 5, target: 3, value: 1.401 },
    { source: 5, target: 26, value: 151.891 },
    { source: 5, target: 19, value: 2.096 },
    { source: 5, target: 12, value: 48.58 },
    { source: 27, target: 15, value: 7.013 },
    { source: 17, target: 28, value: 20.897 },
    { source: 17, target: 3, value: 6.242 },
    { source: 28, target: 18, value: 20.897 },
    { source: 29, target: 15, value: 6.995 },
    { source: 2, target: 12, value: 121.066 },
    { source: 2, target: 30, value: 128.69 },
    { source: 2, target: 18, value: 135.835 },
    { source: 2, target: 31, value: 14.458 },
    { source: 2, target: 32, value: 206.267 },
    { source: 2, target: 19, value: 3.64 },
    { source: 2, target: 33, value: 33.218 },
    { source: 2, target: 20, value: 4.413 },
    { source: 34, target: 1, value: 4.375 },
    { source: 24, target: 5, value: 122.952 },
    { source: 35, target: 26, value: 839.978 },
    { source: 36, target: 37, value: 504.287 },
    { source: 38, target: 37, value: 107.703 },
    { source: 37, target: 2, value: 611.99 },
    { source: 39, target: 4, value: 56.587 },
    { source: 39, target: 1, value: 77.81 },
    { source: 40, target: 14, value: 193.026 },
    { source: 40, target: 13, value: 70.672 },
    { source: 41, target: 15, value: 59.901 },
    { source: 42, target: 14, value: 19.263 },
    { source: 43, target: 42, value: 19.263 },
    { source: 43, target: 41, value: 59.901 },
    { source: 4, target: 19, value: 0.882 },
    { source: 4, target: 26, value: 400.12 },
    { source: 4, target: 12, value: 46.477 },
    { source: 26, target: 15, value: 525.531 },
    { source: 26, target: 3, value: 787.129 },
    { source: 26, target: 11, value: 79.329 },
    { source: 44, target: 15, value: 9.452 },
    { source: 45, target: 1, value: 182.01 },
    { source: 46, target: 15, value: 19.013 },
    { source: 47, target: 15, value: 289.366 }
  ]
};

let empty = {
  nodes: [
    {
      node: 0,
      name: 'Node0'
    },
    {
      node: 1,
      name: 'Node1'
    }
  ],
  links: [
    {
      source: 0,
      target: 1,
      value: 100
    }
  ]
};

const initialState = defaultData;

// Action Types
const UPDATE_DATA = 'UPDATE_DATA';
const IMPORT_DATA = 'IMPORT_DATA';
const GET_ONE_CHART = 'GET_CHART';
const GET_USER_CHARTS = 'GET_USER_CHARTS';
const DELETE_USER_CHART = 'DELETE_USER_CHARTS';

const SET_CHART_ID = 'SET_CHART_ID';
const SET_SANKEY_TITLE = 'SET_SANKEY_TITLE';
const SET_CHART = 'SET_CHART';

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

export const setSankeyTitle = title => ({
  type: SET_SANKEY_TITLE,
  title
});

export const setSankeyId = chartId => ({
  type: SET_CHART_ID,
  chartId
});

export const setChart = chart => ({
  type: SET_CHART,
  chart
});

//THUNKS
export const saveSankeyChartThunk = (data, title) => {
  console.log('KKKKK');
  return dispatch => {
    console.log('QQQQQ');
    saveChart(data, title)
      .then(chartId => {
        console.log('emow');
        dispatch(setSankeyTitle(title));
        dispatch(setSankeyId(chartId));
        history.push(`/edit/sankey/${chartId}/${title}`);
      })
      .catch(err => console.error(err));
  };
};

// export const updateSankeyChartThunk = (data, chartId) => {
//   return dispatch => {
//     dispatch(updateChart(data, chartId));
//   };
// };

// dispatch({
//   type: UPDATE_DATA,
//   data
// });

// export const saveChart = (data) => async dispatch => {
//   let newChartKey = firebase.auth().currentUser.email.child('chart').key;
//   console.log('userid', userId)
//   userRef.set(data, snapshot => {
//     dispatch({
//       type: UPDATE_DATA,
//       data: data
//     });
//   });
// };

// Thunk creators

//Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATA:
      console.log(action.data, 'DATA UPDATED');
      defaultData = action.data;
      return { ...state, nodes: action.data.nodes, links: action.data.links };
    case DELETE_USER_CHART:
      return { ...state, nodes: empty.nodes, links: empty.links };
    case SET_CHART_ID:
      return { ...state, chartId: action.chartId };
    case SET_CHART:
      return action.chart;
    default:
      return state;
  }
}
