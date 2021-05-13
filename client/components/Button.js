import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import { color, font, layout } from '../constants';

export const BUTTON_CONTAINER_ID = 'button-container';
export const BUTTON_TEXT_ID = 'button-text';
export const BUTTON_ACTIVITY_INDICATOR_ID = 'button-activity-indicator';

const commonContainerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderBottomWidth: 5,
};

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
  const sizeStyles = (() => {
    switch (size) {
      case 'small':
        return {
          container: {
            height: layout.buttonSizes.small,
            borderRadius: layout.radius.md,
          },
          title: font.largeBold,
        };
      case 'large': /* FALLTHROUGH */
      default:
        return {
          container: {
            height: layout.buttonSizes.large,
            borderRadius: layout.radius.lg,
          },
          title: font.h3,
        };
    }
  })();

  const colorStyles = (() => {
    switch (type) {
      case 'primary':
        return {
          container: {
            default: {
              backgroundColor: color.yellow500,
              borderColor: color.defaultBorderColor,
            },
            focused: {
              backgroundColor: color.accentFocused,
              borderColor: color.defaultBorderColor,
            },
            disabled: {
              backgroundColor: color.accentDisabled,
              borderColor: color.disabledBorderColor,
            },
          },
          title: {
            default: {
              color: color.defaultDarkTextColor,
            },
            disabled: {
              color: color.disabledDarkTextColor,
            },
          },
        };
      case 'danger':
        return {
          container: {
            default: {
              backgroundColor: color.danger,
              borderColor: color.defaultBorderColor,
            },
            focused: {
              backgroundColor: color.dangerFocused,
              borderColor: color.defaultBorderColor,
            },
            disabled: {
              backgroundColor: color.dangerDisabled,
              borderColor: color.disabledBorderColor,
            },
          },
          title: {
            default: {
              color: color.defaultLightTextColor,
            },
            disabled: {
              color: color.disabledLightTextColor,
            },
          },
        };
      case 'secondary': /* FALLTHROUGH */
      default:
        return {
          container: {
            default: {
              backgroundColor: color.white,
              borderColor: color.defaultBorderColor,
            },
            focused: {
              backgroundColor: color.gray200,
              borderColor: color.defaultBorderColor,
            },
            disabled: {
              backgroundColor: color.white,
              borderColor: color.disabledBorderColor,
            },
          },
          title: {
            default: {
              color: color.defaultDarkTextColor,
            },
            disabled: {
              color: color.disabledDarkTextColor,
            },
          },
        };
    }
  })();

  const buttonStyles = makeButtonStyles(sizeStyles, colorStyles);

  return (
    <TouchableHighlight
      testID={BUTTON_CONTAINER_ID}
      disabled={disabled || isLoading}
      onPress={onPress}
      underlayColor={colorStyles.container.focused.backgroundColor}
      style={[
        disabled
          ? buttonStyles.disabledContainer
          : buttonStyles.defaultContainer,
        props.style,
      ]}>
      {isLoading ? (
        <ActivityIndicator
          testID={BUTTON_ACTIVITY_INDICATOR_ID}
          size="small"
          color={buttonStyles.defaultTitle.color}
        />
      ) : (
        <Text
          testID={BUTTON_TEXT_ID}
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
