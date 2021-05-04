import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text, TouchableHighlight } from 'react-native';

import { color, font, layout } from '../constants';

export default function Button({
  title,
  primary = false,
  type = 'secondary',
  disabled = false,
  small = false,
  isLoading = false,
  onPress = () => {},
  ...props
}) {
  const stateStyle = primary ? primaryStyle : secondaryStyle;
  const currentStyle = disabled ? stateStyle.disabled : stateStyle.default;
  const sizeStyle = small ? smallStyle : bigStyle;

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      underlayColor={primary ? color.accentFocused : color.lightGray}
      style={[currentStyle, sizeStyle, props.style]}>
      {isLoading ? (
        <ActivityIndicator color={primary ? color.white : color.black} />
      ) : (
        <Text style={small ? stateStyle.textSmall : stateStyle.text}>
          {title.toLocaleUpperCase()}
        </Text>
      )}
    </TouchableHighlight>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  onPress: PropTypes.func,
};

export const buttonStyles = {
  alignItems: 'center',
  borderWidth: layout.border.thick,
  justifyContent: 'center',
};

export const smallStyle = {
  height: 35,
  borderRadius: layout.radius.sm,
  padding: layout.spacing.sm,
};

export const bigStyle = {
  height: 52,
  borderRadius: layout.radius.md,
  padding: layout.spacing.md,
};

export const primaryStyle = StyleSheet.create({
  text: {
    ...font.h3,
    color: color.white,
  },
  textSmall: {
    ...font.large,
    color: color.white,
  },
  default: {
    ...buttonStyles,
    backgroundColor: color.accent,
    borderColor: color.accent,
  },
  disabled: {
    ...buttonStyles,
    backgroundColor: color.accentDisabled,
    borderColor: color.accentDisabled,
  },
});

export const secondaryStyle = StyleSheet.create({
  text: {
    ...font.h3,
    color: color.black,
  },
  textSmall: {
    ...font.large,
    color: color.black,
  },
  default: {
    ...buttonStyles,
    backgroundColor: 'transparent',
    borderColor: color.black,
  },
  disabled: {
    ...buttonStyles,
    backgroundColor: 'transparent',
    borderColor: color.lightGray,
  },
});

export const dangerStyle = StyleSheet.create({
  text: {
    ...font.h3,
    color: color.black,
  },
  textSmall: {
    ...font.large,
    color: color.black,
  },
  default: {
    ...buttonStyles,
    backgroundColor: 'transparent',
    borderColor: color.black,
  },
  disabled: {
    ...buttonStyles,
    backgroundColor: 'transparent',
    borderColor: color.lightGray,
  },
});
