import React from 'react';
import {Image} from 'react-native';
import Home from '../modules/home';
import Colors from '../themes/colors';
import images from '../assets/images';
import Splash from '../modules/splash';
import ScreenNames from './screenNames';
import Login from '../modules/auth/login';
import Settings from '../modules/settings';
import SignUp from '../modules/auth/signup';
import {navigationRef} from '../utils/navigationService';
import {NavigationContainer} from '@react-navigation/native';
import ProductDescription from '../modules/home/productDescription';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function Router() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={ScreenNames.SPLASH}
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen
          component={Splash}
          name={ScreenNames.SPLASH}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen component={Login} name={ScreenNames.LOGIN} />
        <Stack.Screen component={SignUp} name={ScreenNames.SIGNUP} />
        <Stack.Screen
          component={BottomTab}
          name={ScreenNames.BOTTOM_TAB}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ProductDescription}
          name={ScreenNames.PRODUCT_DESCRIPTION}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        component={Home}
        name={ScreenNames.HOME}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused)
              return (
                <Image
                  resizeMode="contain"
                  source={images.home}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: Colors.primaryColor,
                  }}
                />
              );
            else
              return (
                <Image source={images.home} style={{height: 20, width: 20}} />
              );
          },
        }}
      />
      <Tab.Screen
        component={Settings}
        name={ScreenNames.SETTINGS}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused)
              return (
                <Image
                  resizeMode="contain"
                  source={images.settings}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: Colors.primaryColor,
                  }}
                />
              );
            else
              return (
                <Image
                  source={images.settings}
                  style={{height: 20, width: 20}}
                />
              );
          },
        }}
      />
    </Tab.Navigator>
  );
};
