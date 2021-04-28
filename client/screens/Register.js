import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Button, FormikInput } from '../components';
import { color, font, layout } from '../constants';

const formSchema = yup.object({
  firstName: yup
    .string()
    .required('Please provide your first name')
    .min(2, 'Your first name should have at least 2 characters'),
  lastName: yup
    .string()
    .required('Please provide your first name')
    .min(2, 'Your first name should have at least 2 characters'),
  email: yup
    .string()
    .required('Please provide your email')
    .email('Please input a valid email address'),
  university: yup
    .string()
    .required('Please provide the name of your university')
    .min(3, 'Your university name should have at least 3 characters'),
  password: yup
    .string()
    .required('Please provide a strong password with at least 8 characters')
    .min(8, 'Your password should have at least 8 characters'),
});

function RegisterHeader({ navigation }) {
  return (
    <>
      <TouchableHighlight
        style={{ width: 90 }}
        underlayColor={color.lightGray}
        onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back" size={30} color={color.darkGray} />
          <Text style={[font.caption, registerScreenStyles.backArrowText]}>
            Back
          </Text>
        </View>
      </TouchableHighlight>
      <Text style={[font.h1, { marginTop: layout.spacing.xxl }]}>
        Hi there 👋
      </Text>
      <Text style={[font.caption, { marginTop: layout.spacing.md }]}>
        To register an account with AuthMe, please fill in your details below.
      </Text>
    </>
  );
}

function RegisterForm({ navigation, auth }) {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(authActions.setAuthIsLoading(true));
    dispatch(authActions.registerUser(values));
  };

  return (
    <View style={{ marginTop: layout.spacing.xxl }}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          university: '',
          password: '',
        }}
        validationSchema={formSchema}
        onSubmit={onSubmit}>
        {props => (
          <>
            <FormikInput
              formikProps={props}
              field="firstName"
              placeholder="First Name"
            />
            <FormikInput
              formikProps={props}
              field="lastName"
              placeholder="Last Name"
            />
            <FormikInput
              formikProps={props}
              field="email"
              placeholder="Email"
              keyboardType="email-address"
              autoComplete="off"
            />
            <FormikInput
              formikProps={props}
              field="university"
              placeholder="University"
            />
            <FormikInput
              secureTextEntry
              formikProps={props}
              field="password"
              placeholder="Password"
            />
            {/* {auth.errors && auth.errors.length !== 0 && (
              <Text style={{ color: color.error }}>
                ERROR: {JSON.stringify(auth.errors)}
              </Text>
            )} */}
            <RegisterFooter
              navigation={navigation}
              disabled={
                props.touched.name &&
                props.touched.email &&
                props.touched.university &&
                props.touched.password &&
                !props.isValid
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

function RegisterFooter({ navigation, disabled, isLoading, onSubmit }) {
  return (
    <View style={{ marginTop: layout.spacing.lg }}>
      <Button
        primary
        disabled={disabled}
        isLoading={isLoading}
        title="Create Account"
        onPress={onSubmit}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[font.body, registerScreenStyles.noAccountText]}>
          I already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Register({ navigation, auth }) {
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={layout.spacing.lg}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            marginTop: layout.defaultScreenMargins.vertical,
            marginHorizontal: layout.defaultScreenMargins.horizontal,
          }}>
          <ScrollView>
            <RegisterHeader navigation={navigation} />
            <RegisterForm auth={auth} navigation={navigation} />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const registerScreenStyles = StyleSheet.create({
  backArrowText: {
    fontFamily: font.fontFamily.medium,
    color: color.darkGray,
    marginLeft: layout.spacing.sm,
  },
  textInput: {
    marginBottom: layout.spacing.lg,
  },
  noAccountText: {
    marginTop: layout.spacing.lg,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Register);
