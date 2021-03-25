import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';

import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import Heading from '../components/Heading';
import FormikField from '../components/FormikField';
import Button from '../components/Button';

import { colours as C, layout as L, typography as T } from '../constants';

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

const Login = props => {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(authActions.setAuthIsLoading(true));
    dispatch(authActions.loginUser(values));
  };

  const { navigation, auth: authInfo } = props;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View style={styles.pageContainer}>
          <Heading style={styles.loginTitle}>Login</Heading>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={() => onSubmit()}
            validationSchema={formSchema}>
            {props => (
              <View>
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
                  keyboardType="visible-password"
                  style={styles.formikField}
                />
                {authInfo.errors !== '' && (
                  <Text>Error: {authInfo.errors}</Text>
                )}
                <Button
                  disabled={!props.isValid}
                  text={authInfo.isLoading ? 'Loading...' : 'Log In'}
                  onPress={props.handleSubmit}
                  style={styles.formSubmitButton}
                />
              </View>
            )}
          </Formik>

          <Text style={styles.forgotPassword}>
            Don't have an account yet?{' '}
            <Text
              onPress={() => {
                navigation.navigate('Register');
              }}
              style={styles.signupText}>
              Sign Up Here!
            </Text>
          </Text>

          <TouchableOpacity
            onPress={() =>
              Alert.alert('Sorry, this feature is not available at the moment.')
            }>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  pageContainer: {
    marginHorizontal: L.pageMarginHorizontal,
    marginVertical: L.pageMarginVertical,
  },
  pageBackButton: {
    position: 'absolute',
  },
  loginTitle: {
    marginTop: L.spacing.xxl,
    marginBottom: L.spacing.xl,
  },
  formikField: {
    marginBottom: L.spacing.l,
  },
  formSubmitButton: {
    marginTop: L.spacing.m,
  },
  forgotPassword: {
    color: '#828489',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#3D3ABF',
    fontSize: 16,
  },
  returnButton: {
    width: 20,
  },
});
