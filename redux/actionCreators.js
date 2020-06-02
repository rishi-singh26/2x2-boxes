import * as ActionTypes from './actionTypes';

export const fetchData = (pageNum = 1) => (dispatch) => {
  dispatch(dataLoading(true));

  return fetch('https://reqres.in/api/unknown?page=' + pageNum)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json())
    .then((data) => dispatch(addData(data)))
    .catch((error) => dispatch(dataFailed(error.message)));
};

export const dataLoading = () => ({
  type: ActionTypes.DATA_LOADING,
});

export const dataFailed = (errmess) => ({
  type: ActionTypes.DATA_FAILED,
  payload: errmess,
});

export const addData = (data) => ({
  type: ActionTypes.GET_DATA,
  payload: data,
});
