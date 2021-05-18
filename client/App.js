import React from 'react';
import { Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import AppNavigator from './components/AppNavigator';
import store from './redux/store';

import AdminViewUsers from './screens/AdminViewUsers';

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    console.log('Loading fonts...');
    return <AppLoading />;
  } else if (fontsError) {
    console.error(`Failed to load fonts: ${fontsError.message}`);
    Alert.alert(fontsError.message);
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          {/* <AppNavigator /> */}
          <AdminViewUsers />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
