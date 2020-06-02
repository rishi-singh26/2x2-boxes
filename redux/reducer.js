import * as ActionTypes from './actionTypes';

export const Data = (
  state = {
    isLoading: true,
    errMess: null,
    data: [],
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.GET_DATA:
      return {...state, isLoading: false, errMess: null, data: action.payload};

    case ActionTypes.DATA_LOADING:
      return {...state, isLoading: true, errMess: null, didatashes: []};

    case ActionTypes.DATA_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};

    default:
      return state;
  }
};
