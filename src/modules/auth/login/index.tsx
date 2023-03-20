// import {useNavigation} from '@react-navigation/native';
// import React, {useState} from 'react';
// import {
//   View,
//   SafeAreaView,
//   Text,
//   KeyboardAvoidingView,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import images from '../../../assets/images';
// import CustomButton from '../../../components/customButton';
// import Loader from '../../../components/loader';
// import ScreenNames from '../../../router/screenNames';
// import {POST_API_CALL} from '../../../services';
// import {vh, vw} from '../../../utils/dimensions';
// import ENDPOINTS from '../../../utils/endPoints';
// import Router from '../../../utils/routerNavigation';
// import {doManualLogin} from '../actions';
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const onEmailChange = (email: string) => {
//     setEmail(email);
//   };
//   const onPasswordChange = (pass: string) => {
//     setPassword(pass);
//   };

//   const onRegisterPress = () => {
//     navigation.navigate(ScreenNames.SIGNUP);
//   };

//

//   return (
//     <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
//       <KeyboardAvoidingView
//         style={{
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           paddingHorizontal: vw(10),
//         }}>
//         <TextInput
//           value={email}
//           onChangeText={onEmailChange}
//           style={styles.email}
//           placeholder={'email'}
//           returnKeyType={'next'}
//           textContentType="username"
//           autoCapitalize="none"
//         />
//         <TextInput
//           value={password}
//           onChangeText={onPasswordChange}
//           style={styles.email}
//           placeholder={'Password'}
//           textContentType="password"
//           returnKeyType="done"
//           secureTextEntry
//           maxLength={15}
//           autoCapitalize="none"
//         />
//         <CustomButton title="Submit" onPress={callback} />
//         <TouchableOpacity
//           style={{
//             alignItems: 'flex-end',
//             alignContent: 'flex-end',
//             alignSelf: 'flex-end',
//             marginRight: vw(20),
//           }}
//           onPress={onRegisterPress}>
//           <Text>{'Register'}</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//       {loading && <Loader isVisible={loading} />}
//     </SafeAreaView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   email: {
//     width: '90%',
//     height: vh(40),
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: 'grey',
//     marginBottom: vh(30),
//     paddingHorizontal: 10,
//   },
// });

// ++++++++++++++++++++++++++++++++++++

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
