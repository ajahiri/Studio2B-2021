import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
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
    width: Dimensions.get('window').width - layout.spacing.xl * 2,
    height: 50,
    borderWidth: 2,
    borderRadius: layout.radius.lg,
  },
});
