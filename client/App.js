import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { Alert } from 'react-native';

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  // Roboto_600SemiBold,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import AppNavigator from './components/AppNavigator';
import store from './redux/store';

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    // Roboto_600SemiBold,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    console.log('Loading fonts...');
    return <AppLoading />;
  } else if (fontsError) {
    console.error(fontsError.message);
    Alert.alert(fontsError.message);
    return null;
  } else {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
