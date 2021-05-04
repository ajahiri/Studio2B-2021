import { IS_STORYBOOK } from '@env';

export default IS_STORYBOOK
  ? require('./storybook').default
  : require('./src/App').default;
