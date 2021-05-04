import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from '../../src/components/Button';

const args = {
  title: 'Button',
  ...actions,
};

const smallArgs = {
  ...args,
  size: 'small',
};

export const actions = {
  onPress: action('onPress'),
};

storiesOf('Button', module)
  .addDecorator(story => <View style={{ margin: 20 }}>{story()}</View>)
  .add('Primary Large', () => <Button type="primary" {...args} />)
  .add('Primary Small', () => <Button type="primary" {...smallArgs} />)
  .add('Secondary Large', () => <Button type="secondary" {...args} />)
  .add('Secondary Small', () => <Button type="secondary" {...smallArgs} />)
  .add('Danger Large', () => <Button type="danger" {...args} />)
  .add('Danger Small', () => <Button type="danger" {...smallArgs} />);
