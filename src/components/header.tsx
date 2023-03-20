import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import images from '../assets/images';

import {vh, vw} from '../utils/dimensions';
const Header = (props: any) => {
  const {title, rightText, onPress, titleStyle} = props;
  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <Image source={images.leftArrow} style={styles.imageStyle} />
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Text
          style={[{alignSelf: 'center'}, titleStyle]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      <View style={{width: vw(40)}}>
        {rightText && <Text>{rightText}</Text>}
      </View>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  mainView: {
    height: vh(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(10),
  },
  imageStyle: {
    height: vw(20),
    width: vw(20),
  },
  touchable: {},
});
