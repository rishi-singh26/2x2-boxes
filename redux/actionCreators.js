import * as ActionTypes from './actionTypes';
import {Alert} from 'react-native';

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

export const postData = (name, year, color, pantone_value, pageNum) => (
  dispatch,
) => {
  const newData = {
    name: name,
    year: year,
    color: color,
    pantone_value: pantone_value,
  };
  console.log('newData ', newData);

  return fetch('https://reqres.in/api/unknown', {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      (response) => {
        if (response.ok) {
          Alert.alert('Color creation successful.');
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
    .then((response) => dispatch(fetchData(pageNum)))
    .catch((error) => {
      console.log('Post Data ', error.message);
    });
};

export const deleteSingleData = (id, pageNum) => (dispatch) => {
  return fetch('https://reqres.in/api/unknown/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      (responce) => {
        if (responce.ok) {
          Alert.alert('Deleted successfully!');
          return responce;
        } else {
          var error = new Error(
            'Error' + responce.status + ': ' + responce.statusText,
          );
          error.responce = responce;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      },
    )
    .then((responce) => dispatch(fetchData(pageNum)))
    .catch((error) => {
      Alert.alert("Couldn't delete item!");
      console.log(error.message);
    });
};

export const editData = (name, year, color, pantone_value, pageNum, id) => (
  dispatch,
) => {
  const newData = {
    name: name,
    year: year,
    color: color,
    pantone_value: pantone_value,
  };

  return fetch('https://reqres.in/api/unknown/' + id, {
    method: 'PUT',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      (responce) => {
        if (responce.ok) {
          Alert.alert('Edit Successful!');
          return responce;
        } else {
          var error = new Error(
            'Error' + responce.status + ': ' + responce.statusText,
          );
          error.responce = responce;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      },
    )
    .then((response) => response.json())
    .then((responce) => dispatch(fetchData(pageNum)))
    .catch((error) => {
      Alert.alert("Couldn't edit! ", error.message);
    });
};
