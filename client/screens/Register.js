import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';

// State management
import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import Heading from '../components/Heading';
import FormikField from '../components/FormikField';
import Button from '../components/Button';

import { colours as C, layout as L, typography as T } from '../constants';

const formSchema = yup.object({
  firstName: yup
    .string()
    .required('Please provide your first name')
    .min(3, 'Your first name should have at least 3 characters'),
  lastName: yup
    .string()
    .required('Please provide your last name')
    .min(3, 'Your first name should have at least 3 characters'),
  university: yup
    .string()
    .required('Please provide the name of your university')
    .min(3, 'Your university name should have at least 3 characters'),
  email: yup
    .string()
    .required('Please provide your email')
    .email('Please input a valid email address'),
  password: yup
    .string()
    .required('Please provide a strong password with at least 8 characters')
    .min(8, 'Your password should have at least 8 characters'),
});

const Register = props => {
  const dispatch = useDispatch();
  const { navigation, auth: authInfo } = props;

  const onSubmit = values => {
    // Set loading spinner on, will be shut off by registerUser handler
    dispatch(authActions.setAuthIsLoading(true));
    dispatch(authActions.registerUser(values));
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.pageContainer}>
            <TouchableOpacity
              style={styles.pageBackButton}
              onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={L.pageBackButtonSize}
                color={C.black}
              />
            </TouchableOpacity>

            <Heading style={styles.registerTitle}>Register</Heading>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                university: '',
                email: '',
                password: '',
              }}
              onSubmit={onSubmit}
              validationSchema={formSchema}>
              {props => (
                <View>
                  <FormikField
                    formikProps={props}
                    field="firstName"
                    placeholder="First Name"
                    style={styles.formikField}
                  />
                  <FormikField
                    formikProps={props}
                    field="lastName"
                    placeholder="Last Name"
                    style={styles.formikField}
                  />
                  <FormikField
                    formikProps={props}
                    field="university"
                    placeholder="University"
                    style={styles.formikField}
                  />
                  <FormikField
                    formikProps={props}
                    field="email"
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.formikField}
                  />
                  <FormikField
                    secureTextEntry
                    formikProps={props}
                    field="password"
                    placeholder="Password"
                    style={styles.formikField}
                  />

                  {authInfo.errors !== '' && (
                    <Text>Error: {authInfo.errors}</Text>
                  )}

                  <Button
                    text={authInfo.isLoading ? 'Loading...' : 'Register'}
                    disabled={!props.isValid}
                    onPress={props.handleSubmit}
                    style={styles.formSubmitButton}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Register);

const styles = StyleSheet.create({
  pageContainer: {
    marginHorizontal: L.pageMarginHorizontal,
    marginVertical: L.pageMarginVertical,
  },
  pageBackButton: {
    position: 'absolute',
  },
  registerTitle: {
    marginTop: L.spacing.xxl,
    marginBottom: L.spacing.xl,
  },
  formikField: {
    marginBottom: L.spacing.l,
  },
  formSubmitButton: {
    marginTop: L.spacing.m,
  },
});
