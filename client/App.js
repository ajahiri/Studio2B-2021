import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { Alert } from 'react-native';

import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import AppNavigator from './components/AppNavigator';
import store from './redux/store';

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
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
        <StatusBar style="dark" />
        <AppNavigator />
      </Provider>
    );
  }
}
