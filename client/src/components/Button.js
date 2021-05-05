import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import { color, font, layout } from '../constants';

export default function Button({
  title,
  type,
  size,
  disabled,
  isLoading,
  onPress,
  ...props
}) {
  const sizeStyle = (size => {
    switch (size) {
      case 'small':
        return smallSizeStyle;
      case 'large':
      default:
        return largeSizeStyle;
    }
  })(size);

  const [colorStyle, focusedColor] = (type => {
    switch (type) {
      case 'primary':
        return [primaryColorStyle, color.accentFocused];
      case 'danger':
        return [dangerColorStyle, color.dangerFocused];
      default:
        return [secondaryColorStyle, color.lightGray];
    }
  })(type);

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      underlayColor={focusedColor}
      style={[
        sizeStyle.container,
        disabled ? colorStyle.disabled : colorStyle.default,
        props.style,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={colorStyle.defaultText} />
      ) : (
        <Text
          style={[
            sizeStyle.title,
            disabled ? colorStyle.disabledText : colorStyle.defaultText,
          ]}>
          {title}
        </Text>
      )}
    </TouchableHighlight>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['large', 'small']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  title: '',
  type: 'secondary',
  size: 'large',
  disabled: false,
  isLoading: false,
  onPress: () => {},
};

const commonContainerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
};

const largeSizeStyle = StyleSheet.create({
  container: {
    ...commonContainerStyle,
    height: 60,
    borderRadius: layout.radius.lg,
    borderWidth: 2,
    borderBottomWidth: 5,
  },
  title: {
    ...font.h3,
  },
});

const smallSizeStyle = StyleSheet.create({
  container: {
    ...commonContainerStyle,
    height: 40,
    borderRadius: layout.radius.md,
    borderBottomWidth: 5,
  },
  title: {
    ...font.largeBold,
  },
});

const defaultBorderColor = color.black;
const disabledBorderColor = color.gray;

const primaryColorStyle = StyleSheet.create({
  default: {
    backgroundColor: color.accent,
    borderColor: defaultBorderColor,
  },
  disabled: {
    backgroundColor: color.accentDisabled,
    borderColor: disabledBorderColor,
  },
  defaultText: {
    color: color.black,
  },
  disabledText: {
    color: color.gray,
  },
});

const secondaryColorStyle = StyleSheet.create({
  default: {
    backgroundColor: color.white,
    borderColor: defaultBorderColor,
  },
  disabled: {
    backgroundColor: color.white,
    borderColor: disabledBorderColor,
  },
  defaultText: {
    color: color.black,
  },
  disabledText: {
    color: color.gray,
  },
});

const dangerColorStyle = StyleSheet.create({
  default: {
    backgroundColor: color.danger,
    borderColor: defaultBorderColor,
  },
  disabled: {
    backgroundColor: color.dangerDisabled,
    borderColor: disabledBorderColor,
  },
  defaultText: {
    color: color.white,
  },
  disabledText: {
    color: color.lightGray,
  },
});
