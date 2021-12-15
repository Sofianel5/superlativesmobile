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
  StyleSheet, View
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AuthStackScreen from './src/features/auth/screens/Auth';
import {useAppDispatch, useAppSelector} from './src/app/hooks';
import Home from './src/components/Home';
import { getUserAction } from './src/features/auth/authSlice';
import VoteResults from './src/features/vote/components/VoteResults';
import SetPass from './src/features/auth/screens/SetPass';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://1e9ee948280141eabff8050210c10048@o1089417.ingest.sentry.io/6104473",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  //: true,
});

declare const global: {HermesInternal: null | {}};

const App = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {dispatch(getUserAction());}, []);
  const status = useAppSelector(state => state.auth.status);
  return (
    <>
      {status === 'authenticated' ? <Home /> : <AuthStackScreen />}
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

export default Sentry.wrap(App);
