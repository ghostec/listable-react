import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';

import navigation from './navigation';
import storage from './storage';

const rootReducer = combineReducers({
  navigation,
  storage
});

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer, undefined, autoRehydrate());
persistStore(store, { blacklist: ['navigation'] }).purge();

export default store;
