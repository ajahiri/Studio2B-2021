// import React from 'react';
import styled from 'styled-components/native';

import { color, font, layout } from '../constants';

const TextInput = styled.TextInput`
  height: 52px;
  background-color: ${color.white};
  border-color: ${color.lightGray};
  border-radius: ${layout.radius.md}px;
  border-width: ${layout.border.thick}px;
  padding: ${layout.spacing.md}px;
  font-family: ${font.fontFamily.medium};
  font-size: ${font.size.md}px;
`;

export default TextInput;

/*

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';

import { color, font, layout } from '../constants';

export default function TextInput({
  value = '',
  placeholder = 'Enter some text...',
  disabled = false,
  error = false,
  ...props
}) {
  return (
    <RNTextInput
      style={[
        error ? textInputStyles.error : textInputStyles.default,
        props.style,
      ]}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      placeholderTextColor={color.gray}
    />
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

const commonStyles = {
  height: 52,
  backgroundColor: color.white,
  borderRadius: layout.radius.zero,
  borderWidth: layout.border.thick,
  padding: layout.spacing.md,
  fontFamily: font.fontFamily.medium,
  fontSize: font.size.md,
};

const textInputStyles = StyleSheet.create({
  default: {
    ...commonStyles,
  },
  error: {
    ...commonStyles,
  },
});
*/
