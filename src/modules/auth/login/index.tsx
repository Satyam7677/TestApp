import colors from '../../../themes/colors';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import CustomButton from '../../../components/customButton';
import {vh, vw, normalize} from '../../../utils/dimensions';
import CustomTextInput from '../../../components/search';
import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InteractionManager,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../../assets/images';
import ScreenNames from '../../../router/screenNames';
import {doManualLogin} from '../actions';
import Router from '../../../utils/routerNavigation';
import Loader from '../../../components/loader';
import {linearAnimation} from '../../../utils/commonFunctions';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const checked = name && password;

  InteractionManager.runAfterInteractions(() => {
    linearAnimation();
  });

  useEffect(() => {
    linearAnimation();
  }, [name, password, loading]);

  const onRegisterPress = () => {
    navigation.navigate(ScreenNames.SIGNUP);
  };

  const onSubmit = () => {
    setLoading(true);
    const payLoad = {
      username: name,
      password: password,
    };
    dispatch(
      doManualLogin(payLoad, response => {
        console.log('Response', response);
        if (response.isSuccess) {
          setLoading(false);
          Router.resetNew(navigation, ScreenNames.BOTTOM_TAB, {});
        } else setLoading(false);
      }),
    );
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={30}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainerStyle}>
        <Image style={styles.logoImageStyle} source={images.logo} />
        <Text style={styles.loginTextStyle}>{'LogIn'}</Text>
        <Text style={styles.greetingTextStyle}>{'Hello'}</Text>
        <CustomTextInput
          leftText=""
          // maxLength={10}
          value={name}
          onChangeText={val => {
            setName(val);
          }}
          placeholder="Your user name"
          mainViewStyle={[styles.customInputStyle]}
          TextInputstyle={styles.textInputStyle}
        />
        <CustomTextInput
          maxLength={15}
          value={password}
          keyboardType={'number-pad'}
          onChangeText={val => {
            setPassword(val);
          }}
          placeholder="Password"
          mainViewStyle={[styles.customInputStyle]}
          TextInputstyle={styles.textInputStyle}
        />

        <View style={styles.checkUncheckStyle}></View>

        <CustomButton
          onPress={onSubmit}
          disable={!checked}
          extraStyle={{
            backgroundColor: checked ? colors.purple : colors.dark_grey,
            alignSelf: 'center',
          }}
          title={'Login'}
        />
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            alignSelf: 'flex-end',
            marginRight: vw(20),
          }}
          onPress={onRegisterPress}>
          <Text>{'Register'}</Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader isVisible={loading} spinnerColor={colors.purple} />}
    </KeyboardAwareScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    marginHorizontal: vw(20),
  },
  logoImageStyle: {
    height: vw(150),
    width: vw(150),
    alignSelf: 'center',
    marginTop: vh(100),
  },
  loginTextStyle: {
    fontWeight: '500',
    marginTop: vh(60),
    color: colors.black,
    fontSize: normalize(18),
  },
  greetingTextStyle: {
    color: colors.dark_grey,
  },
  textInputStyle: {
    borderRadius: normalize(10),
    paddingHorizontal: normalize(10),
  },
  customInputStyle: {
    marginTop: vh(30),
    marginHorizontal: vw(0),
    paddingHorizontal: vw(10),
    borderRadius: normalize(10),
  },
  checkUncheckStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(20),
    marginLeft: vw(10),
  },
  checkImageStyle: {
    height: vw(20),
    width: vw(20),
  },
  unCheckImageStyle: {
    height: vw(20),
    width: vw(20),
    tintColor: colors.purple,
  },
  keepSignedInTextStyle: {
    marginLeft: vw(20),
    color: colors.black,
    fontSize: normalize(16),
    fontWeight: '500',
  },
  errorMsgStyle: {
    color: colors.red,
    marginLeft: vw(10),
    marginTop: vh(10),
  },
});
