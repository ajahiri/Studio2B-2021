import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';

// State management
import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

export default function Login({ navigation }) {
  const returnImage = require('../../client/assets/Login/Union.png');
  const logo = require('../../client/assets/Login/Logo.png');

  const dispatch = useDispatch();

  let [_fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={styles.title}>Login</Text>
        </View>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => {
            dispatch(authActions.loginUser(values))
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
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  onBlur={props.handleBlur('email')}
                />
                <Text>{props.touched.email && props.errors.email}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  onBlur={props.handleBlur('password')}
                />
                <Text>{props.touched.password && props.errors.password}</Text>
              </View>
              <View style={styles.loginButtonContainer}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={props.handleSubmit}>
                  <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>
              </View>
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
});
