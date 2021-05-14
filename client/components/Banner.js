import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { color, font, layout } from '../constants';

function makeBannerStyles(colorStyles) {
  return StyleSheet.create({
    container: {
      backgroundColor: colorStyles.backgroundColor,
      borderColor: colorStyles.borderColor,
      borderWidth: layout.border.thin,
      borderRadius: layout.radius.md,
      flexDirection: 'row',
      paddingVertical: layout.spacing.sm * 1.5,
      paddingHorizontal: layout.spacing.md,
    },
    message: {
      ...font.smallBold,
      flex: 1,
      color: color.black,
      paddingLeft: layout.spacing.sm * 1.5,
      paddingTop: layout.spacing.sm,
    },
  });
}

export default function Banner({ type, message, ...props }) {
  const colorStyles = (type => {
    switch (type) {
      case 'information':
        return {
          backgroundColor: color.blue300,
          borderColor: color.blue700,
        };
      case 'success':
        return {
          backgroundColor: color.green300,
          borderColor: color.green700,
        };
      case 'warning':
        return {
          backgroundColor: color.orange300,
          borderColor: color.orange700,
        };
      case 'error':
        return {
          backgroundColor: color.red300,
          borderColor: color.red700,
        };
      case 'generic': /* FALLTHROUGH */
      default:
        return {
          backgroundColor: color.gray300,
          borderColor: color.gray700,
        };
    }
  })(type);

  const bannerStyles = makeBannerStyles(colorStyles);

  const icon = (type => {
    switch (type) {
      case 'success':
        return 'checkmark-circle-outline';
      case 'warning':
        return 'alert-circle-outline';
      case 'error':
        return 'close-circle-outline';
      case 'information': /* FALLTHROUGH */
      case 'generic': /* FALLTHROUGH */
      default:
        return 'information-circle-outline';
    }
  })(type);

  return (
    <View style={[bannerStyles.container, props.style]}>
      <Ionicons name={icon} size={24} color={colorStyles.borderColor} />
      <Text style={[bannerStyles.message]}>{message}</Text>
    </View>
  );
}

Banner.propTypes = {
  type: PropTypes.oneOf([
    'generic',
    'information',
    'success',
    'warning',
    'error',
  ]),
  message: PropTypes.string.isRequired,
};

Banner.defaultProps = {
  type: 'generic',
  message: '',
};
