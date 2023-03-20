import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../assets/images';
import Loader from '../../components/loader';
import Search from '../../components/search';
import ScreenNames from '../../router/screenNames';
import Colors from '../../themes/colors';
import {RESET_STORE} from '../../utils/actionTypes';
import {linearAnimation, useDebounce} from '../../utils/commonFunctions';
import {SCREEN_WIDTH, vh, vw} from '../../utils/dimensions';
import Router from '../../utils/routerNavigation';
import {getListProducts, getSearchedProducts} from './action';

const Home = () => {
  const {gender} = useSelector((state: any) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchInputRef: any = useRef(null);
  const [searchData, setSearchData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState('');
  const lazySearch = useDebounce(value, 500);

  InteractionManager.runAfterInteractions(() => {
    linearAnimation();
  });

  useEffect(() => {
    linearAnimation();
  }, [data, loading]);

  useEffect(() => {
    // Reset the pagination when the search text changes
    setSkip(0);
    loadInitialData();
  }, [lazySearch]);

  const loadInitialData = async () => {
    // Set the initial state and load the first page of data
    setLoading(true);
    setRefreshing(true);
    const payload = {
      limit: 10,
      skip: 0,
      searchText: value,
    };

    getSearchedProducts(payload, res => {
      if (res.isSuccess) {
        setTotal(res.data.total);
        setData(res.data.products);
        setSkip(prev => prev + 10);
        setLoading(false);
        setRefreshing(false);
      } else {
        setLoading(false);
        setRefreshing(false);
      }
    });
  };

  const loadMoreData = async () => {
    // Load the next page of data
    if (total > skip) {
      if (loading) {
        return;
      }

      setLoading(true);

      const nextPage = skip + 10;
      const payload = {
        limit: 10,
        skip: nextPage,
        searchText: value,
      };
      getSearchedProducts(payload, res => {
        setSkip(skip + 10);
        setTotal(res.data.total);
        setData(prev => [...prev, ...res.data.products]);
        setLoading(false);
      });
    }
  };

  // const onEndReached = () => {
  //   if (total > data.length) fetchNextPage();
  // };

  const clearSkipTotal = () => {};

  const clear = () => {
    setValue('');
    clearSkipTotal();
  };

  const itemSeparator = () => {
    return <View style={{height: vh(10)}} />;
  };

  const handleRefresh = async () => {
    // Reload the initial data and reset the pagination
    if (loading) {
      return;
    }

    setRefreshing(true);
    loadInitialData();
  };

  const renderFooter = () => {
    // Render a loading indicator at the end of the list
    if (!loading) {
      return null;
    }

    return <ActivityIndicator />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Search
        ref={searchInputRef}
        value={value}
        onChangeText={(val: string) => {
          setValue(val);
        }}
        rightIcon={value ? images.crossButton : ''}
        rightIconStyle={{height: 15, width: 15}}
        rightIconOnPress={value ? clear : () => {}}
        placeholder={'Search'}
        mainViewStyle={{
          backgroundColor: Colors.white,
          borderWidth: 0,
          marginVertical: 10,
          paddingRight: 10,
        }}
      />
      <FlatList
        data={data}
        renderItem={({item}) => <Card key={item.id.toString()} item={item} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={3}
        windowSize={6}
        keyExtractor={(item, index) => item.id}
        ItemSeparatorComponent={itemSeparator}
        contentContainerStyle={{paddingHorizontal: vw(10)}}
        numColumns={2}
        bounces={true}
        ListFooterComponent={renderFooter}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
      {loading && <Loader isVisible={loading} spinnerColor={Colors.purple} />}
    </SafeAreaView>
  );
};
export default Home;

const Card = React.memo(({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate(ScreenNames.PRODUCT_DESCRIPTION, {item});
      }}
      style={styles.renderItem}>
      <Text numberOfLines={1} style={styles.productTitle}>
        {item.title}
      </Text>
      <FastImage
        source={{uri: item.thumbnail}}
        style={{height: vh(200), width: '100%'}}
        resizeMode={'contain'}
      />
      <Text numberOfLines={1} style={styles.brandName}>
        {item.brand}
      </Text>
      <Text style={styles.price}>{`$ ${item.price}`}</Text>
    </TouchableOpacity>
  );
});

// const SeparateTextInput: any = React.forwardRef((props: any, ref) => {
//   const [value, setValue] = useState('');
//   const lazySearch = useDebounce(value, 500);

//   InteractionManager.runAfterInteractions(() => {
//     linearAnimation();
//   });

//   useEffect(() => {
//     linearAnimation();
//   }, [value]);

//   useEffect(() => {
//     props.search();
//   }, [lazySearch]);

//   const clear = () => {
//     props.clearSkipTotal();
//     setValue('');
//   };

//   useImperativeHandle(ref, () => ({
//     resetValue: () => setValue(''),
//     getValue: () => value,
//   }));
//   return (
//     <Search
//       value={value}
//       onChangeText={(val: string) => {
//         if (val === '') {
//           props.clearSkipTotal();
//         }
//         setValue(val);
//       }}
//       rightIcon={value ? images.crossButton : ''}
//       rightIconStyle={{height: 15, width: 15}}
//       rightIconOnPress={value ? clear : () => {}}
//       placeholder={'Search'}
//       mainViewStyle={{
//         backgroundColor: Colors.white,
//         borderWidth: 0,
//         marginVertical: 10,
//         paddingRight: 10,
//       }}
//     />
//   );
// });

const styles = StyleSheet.create({
  productTitle: {
    fontSize: vw(15),
    color: Colors.black,
    fontWeight: '500',
    textAlign: 'center',
  },
  brandName: {
    fontSize: vw(16),
    color: Colors.blue,
    fontWeight: '600',
    textAlign: 'center',
  },
  price: {
    fontSize: vw(18),
    color: Colors.blue,
    fontWeight: '400',
    textAlign: 'center',
  },
  renderItem: {
    alignItems: 'center',
    //   borderWidth: 1,
    borderRadius: 10,
    //   borderColor: Colors.dimGrey,
    paddingVertical: vh(10),
    backgroundColor: Colors.white,
    width: '49%',
    marginRight: 10,
    paddingHorizontal: vw(10),
    justifyContent: 'space-between',
  },
});
