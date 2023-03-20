import {combineReducers} from 'redux';
import AuthReducer from '../modules/auth/reducer';
import {RESET_STORE} from '../utils/actionTypes';

const RootReducer = combineReducers({AuthReducer});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    console.log('Inside RESET');
    let oldAuth = state.AuthReducer;
    state = undefined;
    const res = RootReducer(state, action);
    return res;
  }
  return RootReducer(state, action);
};
export default rootReducer;
