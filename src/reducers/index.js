import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import {enableBatching} from 'redux-batched-actions';

import navigation from './navigation';
import storage from './storage';
import session from './session';
import lists from './lists';
import user_lists from './user_lists';
import list_items from './list_items';
import user_list_items from './user_list_items';
import users from './users';

const appReducer = combineReducers({
  navigation,
  storage,
  session,
  lists,
  user_lists,
  list_items,
  user_list_items,
  users
});

const rootReducer = (state, action) => {
  if(action.type == 'SESSION/DISCARD_TOKEN') {
    const { storage } = state;
    state = { storage  };
  }

  return appReducer(state, action);
}

const store = compose(applyMiddleware(thunk))(createStore)(enableBatching(rootReducer), undefined, autoRehydrate());
persistStore(store, {
  blacklist: ['navigation'],
  transforms: [immutableTransform()]
});

export default store;
