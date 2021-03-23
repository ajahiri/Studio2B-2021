import React from 'react';
import RN, { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';

// State management
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Button, FormikField, Heading } from '../components';
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

export default function Register({ navigation }) {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(authActions.registerUser(values))
      .then(async result => {
        if (result.success) {
          try {
            await AsyncStorage.setItem('token', result.token);
            navigation.navigate('Dashboard');
          } catch (error) {
            console.error(error);
            Alert.alert(error);
          }
        } else {
          Alert.alert(result.message);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <RN.SafeAreaView>
      <RN.KeyboardAvoidingView>
        <RN.ScrollView>
          <RN.View style={styles.pageContainer}>
            <RN.TouchableOpacity
              style={styles.pageBackButton}
              onPress={() => navigation.navigate('Start')}>
              <AntDesign
                name="arrowleft"
                size={L.pageBackButtonSize}
                color={C.black}
              />
            </RN.TouchableOpacity>

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
                <RN.View>
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

                  <Button
                    text="Register"
                    disabled={!props.isValid}
                    onPress={props.handleSubmit}
                    style={styles.formSubmitButton}
                  />
                </RN.View>
              )}
            </Formik>
          </RN.View>
        </RN.ScrollView>
      </RN.KeyboardAvoidingView>
    </RN.SafeAreaView>
  );
}

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
