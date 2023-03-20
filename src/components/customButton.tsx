import {StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH, vh} from '../utils/dimensions';
import {Text} from 'react-native';
import Colors from '../themes/colors';

const CustomButton = (props: any) => {
  const {title, onPress, extraStyle, textStyle, disable} = props;
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[styles.buttonStyle, extraStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: SCREEN_WIDTH / 2,
    backgroundColor: Colors.yellowUserTagColor,
    height: vh(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    color: Colors.white,
  },
});
