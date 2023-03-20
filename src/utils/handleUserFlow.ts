import {AuthModal} from './modals';
import {navigationRef} from './navigationService';
import {CommonActions} from '@react-navigation/native';
import ScreenNames from '../router/screenNames';

export const handleUserFlow = (
  data: AuthModal,
  comingFrom: string = 'splash',
) => {
  console.log('Data', data);
  if (data.token)
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: ScreenNames.BOTTOM_TAB}],
      }),
    );
  else
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: ScreenNames.LOGIN}],
      }),
    );
};
