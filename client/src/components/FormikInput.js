import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TextInput from './TextInput';
import { color, font, layout } from '../constants';

export default function FormikInput({
  formikProps,
  field,
  placeholder = '',
  keyboardType = 'default',
  secureTextEntry = false,
  autoComplete = 'off',
  ...props
}) {
  return (
    <View style={[formikInputStyles.textInputContainer, props.style]}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        autoCorrect={false}
        error={formikProps.touched[field] && formikProps.errors[field]}
        value={formikProps.values[field]}
        onChangeText={formikProps.handleChange(field)}
        onBlur={formikProps.handleBlur(field)}
        style={formikInputStyles.textInput}
      />
      {field && formikProps.touched[field] && formikProps.errors[field] && (
        <Text style={formikInputStyles.textInputMessage}>
          {formikProps.errors[field]}
        </Text>
      )}
    </View>
  );
}

const formikInputStyles = StyleSheet.create({
  textInput: {
    marginBottom: layout.spacing.sm,
  },
  textInputMessage: {
    color: color.danger,
    fontFamily: font.fontFamily.regular,
    marginHorizontal: layout.spacing.md,
  },
  textInputContainer: {
    marginBottom: layout.spacing.lg,
  },
  noAccountText: {
    marginTop: layout.spacing.lg,
    textAlign: 'center',
  },
});
