import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ReducersModal} from '../../utils/modals';
// import localImages from '@geofirm/utils/localImages';
import SplashScreen from 'react-native-splash-screen';

import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  vh,
  vw,
} from '../../utils/dimensions';
import {handleUserFlow} from '../../utils/handleUserFlow';
import images from '../../assets/images';
import colors from '../../themes/colors';

export default function Splash() {
  const data = useSelector((state: ReducersModal) => state.AuthReducer);
  const [progress, setProgress] = useState(new Animated.Value(0));
  useEffect(() => {
    setTimeout(
      () => {
        handleUserFlow(data);
      },

      1300,
    );
    // SplashScreen.hide();
  }, []);
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.mainViewStyle}>
      <Image style={styles.Whatsappimg} source={images.logo} />
      <Text style={styles.logoTextStyle}>{'Lets Buy'}</Text>
      <View style={styles.bar}>
        <Animated.View style={[styles.progress, {width}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Whatsappimg: {
    width: vw(80),
    height: vw(80),
    resizeMode: 'contain',
  },
  logoTextStyle: {
    marginTop: vh(10),
    fontWeight: '500',
    color: colors.black,
    fontSize: normalize(16),
  },
  bar: {
    width: '40%',
    height: vh(10),
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: vh(30),
    backgroundColor: colors.grey,
  },
  progress: {
    height: '100%',
    backgroundColor: colors.purple,
  },
});
