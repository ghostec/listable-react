import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

import navigation from './navigation';
import storage from './storage';
import session from './session';
import lists from './lists';

const rootReducer = combineReducers({
  navigation,
  storage,
  session,
  lists
});

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer, undefined, autoRehydrate());
persistStore(store, { blacklist: ['navigation'] }).purge();

export default store;
