import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

import navigation from './navigation';
import storage from './storage';
import session from './session';

const rootReducer = combineReducers({
  navigation,
  storage,
  session
});

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer, undefined, autoRehydrate());
persistStore(store, { blacklist: ['navigation'] }).purge();

export default store;
