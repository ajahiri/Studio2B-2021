import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Decorator from './Decorator';
import Banner from '../../src/components/Banner';

const defaultArgs = {
  message: 'This is a message.',
  // message: `We've added some basic stories inside the storybook/stories directory. A story is a single state of one or more UI components. You can have as many stories as you want. Basically a story is like a visual test case.`,
};

storiesOf('Banner', module)
  .addDecorator(story => <Decorator>{story()}</Decorator>)
  .add('Generic', () => <Banner type="generic" {...defaultArgs} />)
  .add('Information', () => <Banner type="information" {...defaultArgs} />)
  .add('Success', () => <Banner type="success" {...defaultArgs} />)
  .add('Warning', () => <Banner type="warning" {...defaultArgs} />)
  .add('Error', () => <Banner type="error" {...defaultArgs} />);
