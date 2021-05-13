import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { color, layout } from '../../constants';

export default function Card({ children, onPress, ...props }) {
  return onPress ? (
    <TouchableHighlight
      underlayColor={color.gray200}
      style={[cardStyles.container, props.style]}
      onPress={onPress}>
      {children}
    </TouchableHighlight>
  ) : (
    children
  );
}

Card.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};

Card.defaultProps = {
  children: null,
  onPress: () => {},
};

const cardStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: layout.radius.lg,
  },
});
