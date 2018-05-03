import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Import sub-reducers
import user from './user'
import trips from './trips'
import order from './cart'
import trip from './selectedTrip'
import orderHistory from './order-history'
import promoCode from './promoCode'

const reducer = combineReducers({
  user,
  trips,
  order,
  trip,
  orderHistory,
  promoCode
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export default store

// Export all form sub-reducers
// (E.G.) export * from ''
