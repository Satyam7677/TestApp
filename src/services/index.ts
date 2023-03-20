import Snackbar from 'react-native-snackbar';
import {showSnackbar} from '../utils/commonFunctions';

const POST_API_CALL = (endPoint: string, payload: any, callback?: any) => {
  fetch(`https://dummyjson.com/${endPoint}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .catch(err => {
      showSnackbar(err?.message);
      callback({isSuccess: false, res: {}});
    })
    .then(res => {
      if (res?.message) {
        showSnackbar(res?.message);
        callback({isSuccess: false, res: {}});
      } else
        callback({
          isSuccess: true,
          res,
        });
    })
    .catch(err => {
      showSnackbar('Error');
      callback({isSuccess: false, res: {}});
      console.log('Error', err);
    });
};

const GET_API_CALL = (endPoint: string, callback?: any) => {
  fetch(`https://dummyjson.com/${endPoint}`)
    .then(res => res.json())
    .catch(err => {
      showSnackbar(err?.message);
    })
    .then(res => {
      if (res?.message) showSnackbar(res?.message);
      callback({isSuccess: true, data: res});
    })
    .catch(err => {
      showSnackbar('Error');
      callback({isSuccess: false, data: {}});
      console.log('Error', err);
    });
};
export {POST_API_CALL, GET_API_CALL};
