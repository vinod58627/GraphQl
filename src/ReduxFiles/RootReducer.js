// slices/index.js

import { combineReducers } from 'redux';
import counterReducer from './Reeducers/CounterReducer';
import UserReducer from './Reeducers/UserReducer';
// import other reducers as needed

const rootReducer = combineReducers({
  counter: counterReducer,
  user: UserReducer,
  // add other reducers here
});

export default rootReducer;
