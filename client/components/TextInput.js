import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { colours as C, layout as L, typography as T } from '../constants';

const StyledTextInput = styled.TextInput`
  background-color: ${C.white};
  border-color: ${props => {
    if (props.isFocused) {
      return C.primary;
    } else if (props.error) {
      return C.error;
    } else {
      return C.darkGrey;
    }
  }};
  border-radius: ${L.borderRadius}px;
  border-width: ${L.borderWidth}px;
  font-size: ${T.sizes.normal}px;
  padding: ${L.defaultPadding}px;
`;

export default function TextInput({
  placeholder = 'Enter some text',
  disabled = false,
  error = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <StyledTextInput
        {...props}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        isFocused={isFocused}
        placeholderTextColor={/* !isFocused && */ error ? C.error : C.darkGrey}
        onFocus={e => {
          setIsFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={e => {
          setIsFocused(false);
          props.onBlur && props.onBlur(e);
        }}
      />
      {error && (
        <AntDesign
          style={styles.errorIcon}
          name="exclamationcircle"
          size={24}
          color={C.error}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorIcon: {
    position: 'absolute',
    right: 0,
    marginTop: 17,
    marginRight: 12,
  },
});
