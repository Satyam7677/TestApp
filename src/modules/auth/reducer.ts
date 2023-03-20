import {SET_AUTH_DATA} from '../../utils/actionTypes';
//   import {ActionType, AuthModal, ParcelModal}
import {ActionType, AuthModal} from '../../utils/modals';

const AuthReducer = (
  state: AuthModal = new AuthModal(),
  action: ActionType,
) => {
  const {type, payload} = action;
  switch (type) {
    case SET_AUTH_DATA:
      return {...state, ...payload};
    // case RESET_PARCEL:
    // return{...new ParcelModal()}
    default:
      return state;
  }
};

export default AuthReducer;
