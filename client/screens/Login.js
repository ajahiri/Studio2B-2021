import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Button, FormikInput } from '../components';
import { color, font, layout } from '../constants';

const formSchema = yup.object({
  email: yup
    .string()
    .required('Please provide your email address')
    .email('Please provide a valid email address'),
  password: yup
    .string()
    .required('Please provide your password')
    .min(8, 'Incomplete password'),
});

function LoginHeader({ navigation }) {
  return (
    <>
      <TouchableHighlight
        style={{ width: 90 }}
        underlayColor={color.lightGray}
        onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back" size={30} color={color.darkGray} />
          <Text style={[font.caption, loginScreenStyles.backArrowText]}>
            Back
          </Text>
        </View>
      </TouchableHighlight>
      <Text style={[font.h1, { marginTop: layout.spacing.xxl }]}>Login</Text>
      <Text style={[font.caption, { marginTop: layout.spacing.md }]}>
        Enter your details below to log in.
      </Text>
    </>
  );
}

function LoginForm({ navigation }) {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(authActions.setAuthIsLoading(true));
    dispatch(authActions.authActions.loginUser(values));
  };

  return (
    <View style={{ marginTop: layout.spacing.xxl }}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={formSchema}
        onSubmit={onSubmit}>
        {props => (
          <>
            <FormikInput
              formikProps={props}
              field="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <FormikInput
              secureTextEntry
              formikProps={props}
              field="password"
              placeholder="Password"
            />
            <LoginFooter
              navigation={navigation}
              disabled={
                props.touched.email && props.touched.password && !props.isValid
              }
              onSubmit={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

function LoginFooter({ navigation, disabled, onSubmit }) {
  return (
    <View style={{ marginTop: layout.spacing.lg }}>
      <Button primary disabled={disabled} title="Login" onPress={onSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[font.body, loginScreenStyles.noAccountText]}>
          I don't have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Login({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={layout.spacing.lg}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            marginTop: layout.defaultScreenMargins.vertical,
            marginHorizontal: layout.defaultScreenMargins.horizontal,
          }}>
          <LoginHeader navigation={navigation} />
          <LoginForm navigation={navigation} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const loginScreenStyles = StyleSheet.create({
  backArrowText: {
    fontFamily: font.fontFamily.medium,
    color: color.darkGray,
    marginLeft: layout.spacing.sm,
  },
  textInput: {
    marginBottom: layout.spacing.sm,
  },
  textInputMessage: {
    color: color.error,
    fontFamily: font.fontFamily.medium,
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
