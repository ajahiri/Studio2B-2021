import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TextInput from './TextInput';
import { colours as C, layout as L } from '../constants';

export default function FormikField({
  formikProps,
  field,
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  ...props
}) {
  return (
    <View {...props}>
      <TextInput
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        error={formikProps.touched[field] && formikProps.errors[field]}
        placeholder={placeholder}
        value={formikProps.values[field]}
        onChangeText={formikProps.handleChange(field)}
        onBlur={formikProps.handleBlur(field)}
      />
      {field && formikProps.touched[field] && formikProps.errors[field] ? (
        <Text style={styles.errorMessage}>{formikProps.errors[field]}</Text>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: C.error,
    paddingTop: L.spacing.s,
    paddingLeft: L.spacing.s,
  },
});
