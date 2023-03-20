import logger from 'redux-logger';
import RootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

let middleware: any = [thunkMiddleware];

//@ts-ignore
const {pathname} = window.location || {};

const enhancer = compose(applyMiddleware(...middleware));

const persistConfig = {
  key: 'root',
  blacklist: [],
  storage: AsyncStorage,
  whitelist: ['AuthReducer'],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
