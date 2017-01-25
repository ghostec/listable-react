import { createSelector } from 'reselect';

export const getResourceId = state => {
  const location = state.navigation.get('location');
  return location.options && location.options.id;
}
