import React from 'react';
import RN, { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';

// State management
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, FormikField, Heading } from '../components';
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

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(authActions.loginUser(values))
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

          <Heading style={styles.loginTitle}>Login</Heading>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={onSubmit}
            validationSchema={formSchema}>
            {props => (
              <RN.View>
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

                <Button
                  disabled={!props.isValid}
                  text="Login"
                  onPress={props.handleSubmit}
                  style={styles.formSubmitButton}
                />
              </RN.View>
            )}
          </Formik>

          <RN.TouchableOpacity
            onPress={() =>
              Alert.alert('Sorry, this feature is not available at the moment.')
            }>
            <RN.Text style={styles.forgotPassword}>Forgot Password?</RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
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
    alignSelf: 'center',
    color: C.darkGrey,
    fontSize: T.sizes.caption,
    marginTop: L.spacing.l,
  },
});
