import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';

// State management
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, TextInput } from '../components';
import { colours as C, layout as L, typography as T } from '../constants';

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export default function Login({ navigation }) {
  // const returnImage = require('../../client/assets/Login/Union.png');
  // const logo = require('../../client/assets/Login/Logo.png');

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
          }
        } else {
          Alert.alert(result.message);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <SafeAreaView>
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

        <Text style={styles.loginTitle}>Login</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={formSchema}>
          {props => (
            <View>
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
                text="Login"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
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
  loginTitle: {
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
  forgotPassword: {
    alignSelf: 'center',
    color: C.darkGrey,
    fontSize: T.sizes.caption,
    marginTop: L.spacing.m,
  },
});
