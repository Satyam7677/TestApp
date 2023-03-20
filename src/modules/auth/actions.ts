import {POST_API_CALL} from '../../services';
import {SET_AUTH_DATA} from '../../utils/actionTypes';
import ENDPOINTS from '../../utils/endPoints';

export const doManualLogin = (data: any, callback: Function) => {
  return (dispatch: any) => {
    POST_API_CALL(ENDPOINTS.AUTH.LOGIN, data, (response: any) => {
      callback(response);
      if (response.isSuccess) {
        dispatch({
          type: SET_AUTH_DATA,
          payload: response.res,
        });
      }
    });
  };
};

export const doSignUp = (data: any, callback: Function) => {
  console.log('doSignUp');
  return (dispatch: any) => {
    POST_API_CALL(ENDPOINTS.AUTH.SIGNUP, data, (response: any) => {
      console.log('Response', response);
      callback(response);
    });
  };
};
