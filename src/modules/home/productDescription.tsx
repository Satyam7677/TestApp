import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  InteractionManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import Header from '../../components/header';
import Loader from '../../components/loader';
import Colors from '../../themes/colors';
import {linearAnimation} from '../../utils/commonFunctions';
import {SCREEN_WIDTH, vh, vw} from '../../utils/dimensions';
const ProductDescription = () => {
  const route: any = useRoute();
  const item = route.params?.item;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  InteractionManager.runAfterInteractions(() => {
    linearAnimation();
  });

  useEffect(() => {
    linearAnimation();
  }, [currentIndex]);

  const onViewableItemsChanged = ({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  };

  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const rating = () => {
    let r = item.rating;
    let ratingArray = [];
    for (let i = 0; i < 5; i++) {
      if (r >= 1) {
        ratingArray.push(1);
        r -= 1;
      } else if (r > 0) {
        ratingArray.push(r);
        r -= r;
      } else {
        ratingArray.push(r);
      }
    }
    return ratingArray;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const imageRenderItem = ({item}) => {
    return (
      <View style={{justifyContent: 'center', flex: 1}} key={item}>
        <FastImage
          resizeMode="contain"
          source={{uri: item}}
          style={{width: SCREEN_WIDTH, height: vh(200)}}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
        {loading && (
          <Loader
            isVisible={true}
            size={20}
            spinnerColor={Colors.primaryColor}
          />
        )}
      </View>
    );
  };

  const dotView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
        {item.images.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                height: 10,
                width: 10,
                borderRadius: 10,
                borderWidth: 1,
                marginRight: 10,
                backgroundColor:
                  currentIndex === index ? Colors.purple : Colors.white,
                alignSelf: 'center',
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: Colors.white,
      }}>
      <Header
        title={item.brand}
        onPress={goBack}
        titleStyle={styles.productTitle}
      />
      <View style={styles.categoryView}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <FlatList
        data={item.images}
        renderItem={imageRenderItem}
        horizontal
        windowSize={1}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        pagingEnabled
        bounces={false}
        contentContainerStyle={{
          backgroundColor: Colors.white,
        }}
        style={{flex: 1}}
      />
      {dotView()}
      <View style={{flex: 2, paddingHorizontal: vw(20)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.priceText}>{`$ ${item.price}`}</Text>
          <View style={{flexDirection: 'row'}}>
            {rating().map(item => {
              if (item === 1)
                return (
                  <Image
                    source={images.star}
                    resizeMode="contain"
                    style={{height: 15, width: 20}}
                  />
                );
              else if (item < 1 && item > 0)
                return (
                  <Image
                    source={images.halfStar}
                    resizeMode="contain"
                    style={{height: 15, width: 20}}
                  />
                );
              else
                return (
                  <Image
                    source={images.zeroRating}
                    resizeMode="contain"
                    style={{height: 15, width: 20}}
                  />
                );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: vh(20),
          }}>
          <Text
            style={
              styles.discountText
            }>{`(${item.discountPercentage} % off)`}</Text>
          <Text style={styles.discountText}>{`In Stock  ${item.stock}`}</Text>
        </View>
        <Text style={styles.brandName}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </SafeAreaView>
  );
};
export default ProductDescription;

const styles = StyleSheet.create({
  productTitle: {
    fontSize: vw(18),
    color: Colors.black,
    marginBottom: vh(20),
    fontWeight: '500',
  },
  brandName: {
    fontSize: vw(18),
    color: Colors.blue,
    fontWeight: '600',
    marginBottom: vh(10),
  },
  price: {
    fontSize: vw(18),
    color: Colors.blue,
    fontWeight: '400',
  },
  description: {
    color: Colors.black,
    letterSpacing: 0.1,
    fontStyle: 'italic',
    textAlign: 'left',
  },
  categoryText: {},
  categoryView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellowUserTagColor,
    minWidth: vw(100),
    maxWidth: vw(120),
  },
  priceText: {
    color: Colors.yellowUserTagColor,
    fontSize: vw(17),
  },
  discountText: {
    color: Colors.blue,
  },
});
