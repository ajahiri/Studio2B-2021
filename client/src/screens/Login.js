import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { connect, useDispatch } from 'react-redux';
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

function LoginHeader({}) {
  return (
    <>
      <Text style={[font.h1, { marginTop: layout.spacing.huge }]}>Sign In</Text>
      <Text style={[font.medium, { marginTop: layout.spacing.md }]}>
        Enter your details below to log in.
      </Text>
    </>
  );
}

function LoginForm({ auth }) {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(authActions.setAuthIsLoading(true));
    dispatch(authActions.loginUser(values));
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
            {auth.errors && auth.errors !== '' ? (
              <Text style={{ color: color.error }}>ERROR: {auth.errors}</Text>
            ) : null}
            <LoginFooter
              disabled={
                props.touched.email && props.touched.password && !props.isValid
              }
              isLoading={auth.isLoading ?? false}
              onSubmit={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

function LoginFooter({ disabled, isLoading, onSubmit }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: layout.spacing.lg }}>
      <Button
        title="Login"
        type="primary"
        disabled={disabled}
        isLoading={isLoading}
        onPress={onSubmit}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[font.medium, loginScreenStyles.noAccountText]}>
          I don't have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Login({ auth }) {
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
          <LoginHeader />
          <LoginForm auth={auth} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const loginScreenStyles = StyleSheet.create({
  noAccountText: {
    marginTop: layout.spacing.lg,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Login);
