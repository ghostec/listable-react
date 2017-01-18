import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import navigation from './navigation';

const rootReducer = combineReducers({
  navigation
});

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer, undefined, autoRehydrate());
persistStore(store, { blacklist: ['navigation'] }).purge();

export default store;
