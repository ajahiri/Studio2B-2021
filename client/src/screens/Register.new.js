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
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// import { useDispatch } from 'react-redux';
// import * as authActions from '../redux/actions/authActions';

import { Formik } from 'formik';
import * as yup from 'yup';

import { Button, FormikInput } from '../components';
import { color, font, layout } from '../constants';

const formSchemaStep0 = yup.object({
  firstName: yup
    .string()
    .required('Please provide your first name')
    .min(2, 'Your first name should have at least 2 characters'),
  lastName: yup
    .string()
    .required('Please provide your last name')
    .min(2, 'Your last name should have at least 2 characters'),
});

const formSchemaStep1 = yup.object({
  university: yup
    .string()
    .required('Please provide the name of your university')
    .min(3, 'Your university name should have at least 3 characters'),
  email: yup
    .string()
    .required('Please provide your email')
    .email('Please input a valid email address'),
  isTeacher: yup.bool().default(false),
});

const formSchemaStep2 = yup.object({
  password: yup
    .string()
    .required('Please provide a strong password with at least 8 characters')
    .min(8, 'Your password should have at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], `Passwords don't match`),
});

function RegisterHeader({ title, caption }) {
  return (
    <>
      <Text style={[font.h1, { marginTop: layout.spacing.xxl }]}>{title}</Text>
      <Text
        style={[
          font.medium,
          { marginTop: layout.spacing.md, marginBottom: layout.spacing.xxl },
        ]}>
        {caption}
      </Text>
    </>
  );
}

function RegisterFooter({
  disabled,
  showBackButton = true,
  isLastStep = false,
  onBack = () => {},
  onSubmit = () => {},
}) {
  return (
    <View style={{ marginTop: layout.spacing.lg, flexDirection: 'row' }}>
      {showBackButton && (
        <Button
          title="Back"
          onPress={onBack}
          style={{ flex: 1, marginRight: layout.spacing.sm }}
        />
      )}
      <Button
        type="primary"
        disabled={disabled}
        title={isLastStep ? 'Finish' : 'Next'}
        onPress={onSubmit}
        style={{ flex: 1, marginLeft: showBackButton ? layout.spacing.sm : 0 }}
      />
    </View>
  );
}

function RegisterForm({}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({});

  const onBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const onSubmit = values => {
    setForm({ ...form, ...values });
    if (currentStep === 2) {
      console.log({ __DONE__: form });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const Step0 = () => (
    <>
      <RegisterHeader title="Hi there! 👋" caption="How should we call you?" />
      <Formik
        initialValues={{ firstName: '', lastName: '' }}
        validationSchema={formSchemaStep0}
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
            <RegisterFooter
              showBackButton={false}
              onSubmit={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </>
  );

  const Step1 = () => (
    <>
      <RegisterHeader
        title={`Hi, ${form.firstName}`}
        caption="Where do you study?"
      />
      <Formik
        initialValues={{ university: '', email: '' }}
        validationSchema={formSchemaStep1}
        onSubmit={onSubmit}>
        {props => (
          <>
            <FormikInput
              formikProps={props}
              field="university"
              placeholder="University"
            />
            <FormikInput
              formikProps={props}
              field="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <RegisterFooter onBack={onBack} onSubmit={props.handleSubmit} />
          </>
        )}
      </Formik>
    </>
  );

  const Step2 = () => (
    <>
      <RegisterHeader
        title="Almost done"
        caption="Set a strong password to secure your account."
      />
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={formSchemaStep2}
        onSubmit={onSubmit}>
        {props => (
          <>
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
              isLastStep
              onBack={onBack}
              onSubmit={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </>
  );

  switch (currentStep) {
    case 0:
      return <Step0 />;
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    default:
      console.log('FINISH STEPS');
      return <Step0 />;
  }
}

export default function Register() {
  const navigation = useNavigation();

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
            <TouchableHighlight
              style={{ width: 85, borderRadius: layout.radius.md }}
              underlayColor={color.lightGray}
              onPress={() => navigation.goBack()}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color={color.darkGray}
                />
                <Text
                  style={[font.mediumBold, registerScreenStyles.backArrowText]}>
                  Back
                </Text>
              </View>
            </TouchableHighlight>

            <RegisterForm />

            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[font.body, registerScreenStyles.noAccountText]}>
                I already have an account
              </Text>
            </TouchableOpacity> */}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  },
});
