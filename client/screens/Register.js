import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';

import { TextInput } from 'react-native-gesture-handler';

import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import * as authActions from '../redux/actions/authActions';

const formSchema = yup.object({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  university: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export default function Register({ navigation }) {
  const returnImage = require('../../client/assets/Login/Union.png');
  const logo = require('../../client/assets/Login/Logo.png');

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.returnButton}>
            <View style={styles.returnImage}>
              <Image source={returnImage} />
            </View>
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logoImage} />
            <Text style={styles.title}>Register</Text>
          </View>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              university: '',
              email: '',
              password: '',
            }}
            onSubmit={values => {
              dispatch(authActions.registerUser(values))
                .then(async result => {
                  if (result.success) {
                    try {
                      await AsyncStorage.setItem('token', result.token);
                      navigation.navigate('Dashboard');
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    Alert.alert(result.message);
                  }
                })
                .catch(err => console.log(err));
            }}
            validationSchema={formSchema}>
            {props => (
              <View>
                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={props.handleChange('firstName')}
                    value={props.values.firstName}
                    onBlur={props.handleBlur('firstName')}></TextInput>
                  <Text>
                    {props.touched.firstName && props.errors.firstName}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={props.handleChange('lastName')}
                    value={props.values.lastName}
                    onBlur={props.handleBlur('lastName')}></TextInput>
                  <Text>{props.touched.lastName && props.errors.lastName}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="University"
                    onChangeText={props.handleChange('university')}
                    value={props.values.university}
                    onBlur={props.handleBlur('university')}></TextInput>
                  <Text>
                    {props.touched.university && props.errors.university}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                    onBlur={props.handleBlur('email')}></TextInput>
                  <Text>{props.touched.email && props.errors.email}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                    onBlur={props.handleBlur('password')}></TextInput>
                  <Text>{props.touched.password && props.errors.password}</Text>
                </View>
                {/* <View style={styles.checkBoxContainer}>
                <View style={styles.checkBox}>
                  <CheckBox style={{ boxType: 'circle', lineWidth: 10 }} />
                  <Text>Register as Teacher?</Text>
                </View>
              </View> */}
                <View style={styles.loginButtonContainer}>
                  <TouchableOpacity
                    // onPress={() => navigation.navigate('ImageAuthRegistration')}
                    onPress={props.handleSubmit}
                    style={styles.loginButton}>
                    <Text style={styles.buttonText}>NEXT</Text>
                  </TouchableOpacity>
                  <Text style={styles.disclaimerText}>
                    By signing up, you agree to SES2B’s Terms of Service and
                    Privacy Policy.
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  form: {
    paddingTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    height: 52,
    marginBottom: 20,
    paddingLeft: 20,
  },
  returnImage: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoImage: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    height: 52,
    backgroundColor: '#3D3ABF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    margin: 'auto',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#828489',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  returnButton: {
    width: 20,
  },
  checkBox: {
    backgroundColor: '#C8CCFF',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 7,
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -10,
  },
  loginButtonContainer: {
    paddingTop: 10,
  },
  disclaimerText: {
    fontSize: 12,
    paddingTop: 10,
  },
});
