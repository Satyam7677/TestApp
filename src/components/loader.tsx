import Colors from '../themes/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';

// custom imports
const Spinner = require('react-native-spinkit');

interface Props {
  isVisible: boolean;
  setFull?: boolean;
  size?: any;
  spinnerColor?: any;
}
/**
 * this is used for common app loader which is render until data/API fetch
 * @param {boolean} isVisible - show/hide loader view
 * @param {boolean} setFull - to control show loader at full view
 * @returns
 */
const Loader = ({
  isVisible,
  setFull,
  size = 80,
  spinnerColor = Colors.primaryColor,
}: Props) => {
  return (
    <View style={[styles.container, setFull && styles.black]}>
      <Spinner
        isVisible={isVisible}
        size={size}
        type="Circle"
        color={spinnerColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 11,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 99,
  },
  spinner: {
    marginBottom: 50,
  },
  black: {
    backgroundColor: 'black',
  },
});

export default Loader;
