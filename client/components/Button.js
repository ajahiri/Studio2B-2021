import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import { color, font, layout } from '../constants';

const commonContainerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderBottomWidth: 5,
};

const defaultBorderColor = color.black;
const disabledBorderColor = color.gray;

function makeButtonStyles(sizeStyles, colorStyles) {
  return StyleSheet.create({
    defaultContainer: {
      ...commonContainerStyle,
      height: sizeStyles.container.height,
      borderRadius: sizeStyles.container.borderRadius,
      backgroundColor: colorStyles.container.default.backgroundColor ?? 'blue',
      borderColor: colorStyles.container.default.borderColor,
    },
    disabledContainer: {
      ...commonContainerStyle,
      height: sizeStyles.container.height,
      borderRadius: sizeStyles.container.borderRadius,
      backgroundColor: colorStyles.container.disabled.backgroundColor ?? 'blue',
      borderColor: colorStyles.container.disabled.borderColor,
    },
    defaultTitle: {
      ...sizeStyles.title,
      color: colorStyles.title.default.color,
    },
    disabledTitle: {
      ...sizeStyles.title,
      color: colorStyles.title.disabled.color,
    },
  });
}

export default function Button({
  title,
  type,
  size,
  disabled,
  isLoading,
  onPress,
  ...props
}) {
  const sizeStyles = (size => {
    switch (size) {
      case 'small':
        return {
          container: {
            height: 40,
            borderRadius: layout.radius.md,
          },
          title: font.largeBold,
        };
      case 'large': /* FALLTHROUGH */
      default:
        return {
          container: {
            height: 60,
            borderRadius: layout.radius.lg,
          },
          title: font.h3,
        };
    }
  })(size);

  const colorStyles = (type => {
    switch (type) {
      case 'primary':
        return {
          container: {
            default: {
              backgroundColor: color.yellow500,
              borderColor: defaultBorderColor,
            },
            focused: {
              backgroundColor: color.accentFocused,
              borderColor: defaultBorderColor,
            },
            disabled: {
              backgroundColor: color.accentDisabled,
              borderColor: disabledBorderColor,
            },
          },
          title: {
            default: {
              color: color.black,
            },
            disabled: {
              color: color.gray,
            },
          },
        };
      case 'danger':
        return {
          container: {
            default: {
              backgroundColor: color.danger,
              borderColor: defaultBorderColor,
            },
            focused: {
              backgroundColor: color.dangerFocused,
              borderColor: defaultBorderColor,
            },
            disabled: {
              backgroundColor: color.dangerDisabled,
              borderColor: disabledBorderColor,
            },
          },
          title: {
            default: {
              color: color.white,
            },
            disabled: {
              color: color.gray300,
            },
          },
        };
      case 'secondary': /* FALLTHROUGH */
      default:
        return {
          container: {
            default: {
              backgroundColor: color.white,
              borderColor: defaultBorderColor,
            },
            focused: {
              backgroundColor: color.gray200,
              borderColor: defaultBorderColor,
            },
            disabled: {
              backgroundColor: color.white,
              borderColor: disabledBorderColor,
            },
          },
          title: {
            default: {
              color: color.black,
            },
            disabled: {
              color: color.gray,
            },
          },
        };
    }
  })(type);

  const buttonStyles = makeButtonStyles(sizeStyles, colorStyles);

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      underlayColor={colorStyles.container.focused.backgroundColor}
      style={[
        disabled
          ? buttonStyles.disabledContainer
          : buttonStyles.defaultContainer,
        props.style,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={buttonStyles.defaultTitle.color} />
      ) : (
        <Text
          style={[
            disabled ? buttonStyles.disabledTitle : buttonStyles.defaultTitle,
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
