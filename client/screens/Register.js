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

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Button, FormikInput } from '../components';
import { color, font, layout } from '../constants';

const formSchema = yup.object({
  name: yup
    .string()
    .required('Please provide your first name')
    .min(3, 'Your first name should have at least 3 characters'),
  email: yup
    .string()
    .required('Please provide your email')
    .email('Please input a valid email address'),
  password: yup
    .string()
    .required('Please provide a strong password with at least 8 characters')
    .min(8, 'Your password should have at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], `Passwords don't match`),
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
      <Text style={[font.h1, { marginTop: layout.spacing.xxl }]}>Hello 👋</Text>
      <Text style={[font.caption, { marginTop: layout.spacing.md }]}>
        To register an account with AuthMe, fill in the details below with.
      </Text>
    </>
  );
}

function RegisterForm({ navigation }) {
  const onSubmit = values => {
    console.log('WILL SUBMIT');
  };

  return (
    <View style={{ marginTop: layout.spacing.xxl }}>
      <Formik
        initialValues={{
          firstName: '',
          email: '',
          password: '',
          confirmPassword: '',
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
            />
            <FormikInput
              secureTextEntry
              formikProps={props}
              field="password"
              placeholder="Password"
            />
            <FormikInput
              secureTextEntry
              formikProps={props}
              field="confirmPassword"
              placeholder="Confirm Password"
            />
            <RegisterFooter
              navigation={navigation}
              disabled={
                props.touched.name &&
                props.touched.email &&
                props.touched.password &&
                props.touched.confirmPassword &&
                !props.isValid
              }
              onSubmit={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

function RegisterFooter({ navigation, disabled, onSubmit }) {
  return (
    <View style={{ marginTop: layout.spacing.lg }}>
      <Button primary disabled={disabled} title="Next" onPress={onSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[font.body, registerScreenStyles.noAccountText]}>
          I already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Register({ navigation }) {
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
            <RegisterForm navigation={navigation} />
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
