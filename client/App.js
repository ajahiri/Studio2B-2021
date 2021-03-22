import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './components/AppNavigator';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
