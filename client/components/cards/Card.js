import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { layout } from '../../constants';

export default function Card({ children, onPress, ...props }) {
  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <View style={[cardStyles.container, props.style]}>{children}</View>
    </TouchableOpacity>
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
    height: 125,
    width: 177,
    borderWidth: 2,
    borderRadius: layout.radius.lg,
  },
});
