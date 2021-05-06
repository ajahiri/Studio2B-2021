import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Decorator from './Decorator';
import Button from '../../src/components/Button';

export const actions = {
  onPress: action('onPress'),
};

const args = {
  title: 'Button',
  ...actions,
};

const smallArgs = {
  ...args,
  size: 'small',
};

storiesOf('Button', module)
  .addDecorator(story => <Decorator>{story()}</Decorator>)
  .add('Primary Large', () => <Button type="primary" {...args} />)
  .add('Primary Small', () => <Button type="primary" {...smallArgs} />)
  .add('Secondary Large', () => <Button type="secondary" {...args} />)
  .add('Secondary Small', () => <Button type="secondary" {...smallArgs} />)
  .add('Danger Large', () => <Button type="danger" {...args} />)
  .add('Danger Small', () => <Button type="danger" {...smallArgs} />);
