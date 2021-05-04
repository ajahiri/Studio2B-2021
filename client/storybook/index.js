import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { loadStories } from './storyLoader';

import './rn-addons';

import * as Font from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

Font.loadAsync({ Montserrat_400Regular, Montserrat_700Bold })
  .then(_ => console.log('Successfully loaded all fonts'))
  .catch(error => console.error(`Failed to load fonts: ${error.message}`));

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  require('./stories');
  // loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage:
    require('@react-native-async-storage/async-storage').AsyncStorage ||
    require('react-native').AsyncStorage ||
    null,
});

export default StorybookUIRoot;
