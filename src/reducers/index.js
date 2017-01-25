import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';

import navigation from './navigation';
import storage from './storage';
import session from './session';
import lists from './lists';
import list_items from './list_items';
import user_list_items from './user_list_items';

const rootReducer = combineReducers({
  navigation,
  storage,
  session,
  lists,
  list_items,
  user_list_items
});

const store = compose(applyMiddleware(thunk))(createStore)(rootReducer, undefined, autoRehydrate());
persistStore(store, {
  blacklist: ['navigation'],
  transforms: [immutableTransform()]
});

export default store;
