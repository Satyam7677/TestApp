import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import Colors from '../themes/colors';
import {Platform, LayoutAnimation, UIManager} from 'react-native';

export const showSnackbar = (title: string = '') => {
  Snackbar.show({
    duration: 2000,
    numberOfLines: 3,
    textColor: Colors.white,
    backgroundColor: Colors.primaryColor,
    text: title || 'something went wrong, please try again.',
    action: {
      text: 'Close',
      textColor: Colors.white,
      onPress: () => {
        Snackbar.dismiss();
      },
    },
  });
};

export const linearAnimation = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
};

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  /**
   * set new settimeout when value changes and call cleartimeout to clear previous one
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
