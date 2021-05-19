import React, { useState } from 'react';
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

import PrivacyPolicy from './PrivacyPolicy';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Banner, Button, FormikInput } from '../components';
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

function RegisterHeader({}) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableHighlight
        style={{ width: 90, borderRadius: layout.radius.md }}
        underlayColor={color.gray200}
        onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="chevron-back" size={30} color={color.darkGray} />
          <Text style={[font.mediumBold, registerScreenStyles.backArrowText]}>
            Back
          </Text>
        </View>
      </TouchableHighlight>
      <Text style={[font.h1, { marginTop: layout.spacing.xxl }]}>
        Hi there 👋
      </Text>
      <Text style={[font.medium, { marginTop: layout.spacing.md }]}>
        To register an account with AuthMe, please fill in your details below.
      </Text>
    </>
  );
}

function RegisterForm({ auth }) {
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
          checkedPrivacy: false,
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
            {!auth.isLoading && auth.errors && auth.errors !== '' ? (
              <Banner type="error" message={auth.errors} />
            ) : null}
            <RegisterFooter
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

function RegisterFooter({ disabled, isLoading, onSubmit }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: layout.spacing.lg }}>
      <Button
        title="Create Account"
        type="primary"
        disabled={disabled}
        isLoading={isLoading}
        onPress={onSubmit}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[font.medium, registerScreenStyles.noAccountText]}>
          I already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Register({ auth }) {
  const [completedPrivacy, setcompletedPrivacy] = useState(0);

  const onPrivacyAgree = () => {
    console.log('privacy agreed');
    setcompletedPrivacy(1);
  };
  return (
    <>
      {completedPrivacy === 0 ? (
        <PrivacyPolicy onAgree={() => onPrivacyAgree()} />
      ) : (
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
                <RegisterHeader />
                <RegisterForm auth={auth} />
              </ScrollView>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const registerScreenStyles = StyleSheet.create({
  backArrowText: {
    color: color.darkGray,
    marginLeft: layout.spacing.sm,
  },
  textInput: {
    marginBottom: layout.spacing.lg,
  },
  noAccountText: {
    marginTop: layout.spacing.lg,
    textAlign: 'center',
    marginBottom: layout.spacing.xxl,
  },
});

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Register);
