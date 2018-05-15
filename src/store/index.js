import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { default as barChart } from './barChart';
import { default as user } from './user';
import { default as sankeyChart } from './sankeyChart';
import { default as allCharts } from './allCharts'

// Import sub-reducers

const reducer = combineReducers({ barChart, user, sankeyChart, allCharts });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;

// Export all form sub-reducers
// (E.G.) export * from ''
export * from './barChart';
export * from './sankeyChart';
export * from './user';
export * from './allCharts';
export * from './mapChart';
