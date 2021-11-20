/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the Redux TypeScript template
 * https://github.com/rahsheen/react-native-template-redux-typescript
 *
 * @format
 */

import React from 'react';
//import 'reflect-metadata';
import {
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AuthStackScreen from './src/features/auth/screens/Auth';
import {useAppDispatch, useAppSelector} from './src/app/hooks';
import Home from './src/components/Home';
import { getUserAction } from './src/features/auth/authSlice';
import Profile from './src/features/profile/screens/Profile'

declare const global: {HermesInternal: null | {}};

const App = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {dispatch(getUserAction());}, []);
  const status = useAppSelector(state => state.auth.status);
  return (
    <>
      {/* {status === 'authenticated' ? <Home /> : <AuthStackScreen />} */}
      <Profile />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
