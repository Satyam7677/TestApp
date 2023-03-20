import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomButton from '../../components/customButton';
import ScreenNames from '../../router/screenNames';
import Colors from '../../themes/colors';
import {RESET_STORE} from '../../utils/actionTypes';
import {vh, vw} from '../../utils/dimensions';
import Router from '../../utils/routerNavigation';
const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const signOut = () => {
    dispatch({
      type: RESET_STORE,
    });
    Router.resetNew(navigation, ScreenNames.LOGIN, {});
  };
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: vw(20), alignItems: 'center'}}>
      <CustomButton
        onPress={signOut}
        title={'Log Out'}
        extraStyle={{
          backgroundColor: Colors.purple,
          height: vh(30),
          marginTop: '10%',
        }}
      />
    </SafeAreaView>
  );
};
export default Settings;
