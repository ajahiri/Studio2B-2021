import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text, TouchableHighlight } from 'react-native';

import { color, font, layout } from '../constants';

export default function Button({
  title,
  primary = false,
  disabled = false,
  size = 'big',
  onPress = () => {},
  ...props
}) {
  const stateStyle = primary ? primaryStyle : secondaryStyle;
  const currentStyle = disabled ? stateStyle.disabled : stateStyle.default;

  const isBig = size === 'big';
  const sizeStyle = isBig ? bigStyle : smallStyle;

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      underlayColor={primary ? color.accentFocused : color.lightGray}
      style={[currentStyle, sizeStyle, props.style]}>
      <Text style={isBig ? stateStyle.text : stateStyle.textSmall}>
        {title}
      </Text>
    </TouchableHighlight>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  size: PropTypes.oneOf(['big', 'small']),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export const buttonStyles = {
  alignItems: 'center',
  borderWidth: layout.border.thin,
  justifyContent: 'center',
};

export const smallStyle = {
  height: 28,
  borderRadius: layout.radius.md,
  padding: layout.spacing.sm,
};

export const bigStyle = {
  height: 50,
  borderRadius: layout.radius.lg,
  padding: layout.spacing.md,
};

export const textStyle = {
  fontWeight: '700',
};

export const bigTextStyle = {
  ...textStyle,
  fontSize: font.size.lg,
};

export const smallTextStyle = {
  ...textStyle,
  fontSize: font.size.sm,
};

export const primaryStyle = StyleSheet.create({
  text: {
    ...bigTextStyle,
    color: color.white,
  },
  textSmall: {
    ...smallTextStyle,
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
    ...bigTextStyle,
    color: color.gray,
  },
  textSmall: {
    ...smallTextStyle,
    color: color.gray,
  },
  default: {
    ...buttonStyles,
    backgroundColor: color.white,
    borderColor: color.gray,
  },
  disabled: {
    ...buttonStyles,
    backgroundColor: color.white,
    borderColor: color.lightGray,
  },
});
