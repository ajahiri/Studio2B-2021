import styled from 'styled-components';
import { color, font, layout } from '../constants';

const TextInput = styled.TextInput`
  height: ${layout.buttonSizes.large}px;
  background-color: ${color.white};
  border-color: ${props => (props.error ? color.danger : color.gray200)};
  border-radius: ${layout.radius.md}px;
  border-width: ${layout.border.thick}px;
  padding-vertical: ${layout.spacing.md}px;
  padding-horizontal: ${layout.spacing.lg}px;
  font-family: ${font.fontFamily.regular};
  font-size: ${font.size.md}px;
`;

export default TextInput;

/*
import React from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';

export default function TextInput({ size, placeholder, keyboardType, secureTextEntry,autoComplete,autoCorrect, }) {
  return (
    <RNTextInput
      style={[
        textInputStyles.container,
        size === 'small'
          ? textInputStyles.smallContainer
          : textInputStyles.largeContainer,
      ]}
      placeholder={placeholder}
    />
  );
}

const textInputStyles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderRadius: layout.radius.md,
    borderWidth: layout.border.thick,
    padding: layout.spacing.md,
    ...font.medium,
  },
  largeContainer: {
    height: layout.buttonSizes.large,
  },
  smallContainer: {
    height: layout.buttonSizes.small,
  },
});
*/
