import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION/SET_TOKEN':
      const { type, ...data } = action;
      return Immutable.fromJS(data);
    default:
      return state;
  }
};
