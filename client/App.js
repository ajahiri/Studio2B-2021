import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { Alert, SafeAreaView } from 'react-native';

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
import ImageAuth from './screens/ImageAuth';

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
        <StatusBar style="dark" />
        {/* <AppNavigator /> */}
        <ImageAuth />
      </Provider>
    );
  }
}
