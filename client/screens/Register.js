import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';

// State management
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { Button, TextInput } from '../components';
import { colours as C, layout as L, typography as T } from '../constants';

const formSchema = yup.object({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  university: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
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
          }
        } else {
          Alert.alert(result.message);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.pageContainer}>
            <TouchableOpacity
              style={styles.pageBackButton}
              onPress={() => navigation.navigate('Start')}>
              <AntDesign
                name="arrowleft"
                size={L.pageBackButtonSize}
                color={C.black}
              />
            </TouchableOpacity>

            <Text style={styles.registerTitle}>Register</Text>

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
                  <TextInput
                    error={props.touched.firstName && props.errors.firstName}
                    style={styles.formTextInput}
                    placeholder="First Name"
                    value={props.values.firstName}
                    onChangeText={props.handleChange('firstName')}
                    onBlur={props.handleBlur('firstName')}
                  />
                  <TextInput
                    error={props.touched.lastName && props.errors.lastName}
                    style={styles.formTextInput}
                    placeholder="Last Name"
                    value={props.values.lastName}
                    onChangeText={props.handleChange('lastName')}
                    onBlur={props.handleBlur('lastName')}
                  />
                  <TextInput
                    error={props.touched.university && props.errors.university}
                    style={styles.formTextInput}
                    placeholder="University"
                    value={props.values.university}
                    onChangeText={props.handleChange('university')}
                    onBlur={props.handleBlur('university')}
                  />
                  <TextInput
                    error={props.touched.email && props.errors.email}
                    style={styles.formTextInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={props.values.email}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                  />
                  <TextInput
                    error={props.touched.password && props.errors.password}
                    style={styles.formTextInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    keyboardType="visible-password"
                    value={props.values.password}
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                  />

                  <Button
                    style={styles.formSubmitButton}
                    text="Register"
                    onPress={props.handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    fontFamily: T.fonts.bold,
    fontSize: T.sizes.title,
    marginBottom: L.spacing.xl,
    marginTop: L.spacing.xxl,
  },
  formTextInput: {
    marginBottom: L.spacing.l,
  },
  formSubmitButton: {
    marginTop: L.spacing.m,
  },
});
