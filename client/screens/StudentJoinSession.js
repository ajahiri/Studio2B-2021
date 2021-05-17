import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from 'react-native';

import { Container, Header, Content, Input, Item, Text } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { Banner, Button } from '../components';
import { color, font, layout } from '../constants';

// Form validation
import { Formik, validateYupSchema, useFormik } from 'formik';
import * as yup from 'yup';
import FormikInput from '../components/FormikInput';

import axios from 'axios';
import { resolveBaseURL } from '../globals/globals';

const BASE_API_URL = resolveBaseURL();

const StudentJoinSession = props => {
  const { name, description, maxStudents, shortID, createdAt } =
    props.currentJoinedSession || {};

  const [joinCode, setJoinCode] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [useScanner, setUseScanner] = useState(false);

  const toggleQRScanner = () => {
    setUseScanner(!useScanner);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onEnrollClassSubmit = async values => {
    try {
      const authToken = await SecureStore.getItemAsync('userToken');
      const response = await axios({
        method: 'post',
        url: `/api/sessions/joinSession`,
        baseURL: BASE_API_URL,
        data: { sessionCode: joinCode },
        headers: {
          'auth-token': authToken,
        },
      });
      console.log(response.data.data);
      props.navigation.navigate({
        name: 'StudentViewSession',
        params: {
          session: response.data.data,
          justJoined: true,
        },
        source: 'Dashboard',
      });
    } catch (err) {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        Alert.alert(
          'Error Joining Session',
          JSON.stringify(err.response.data),
          [{ text: 'OK' }],
        );
      } else if (err.request) {
        // client never received a response, or request never left
        console.log(err.request);
      } else {
        // anything else
        console.log(err);
      }
      formikProps.setFieldValue('joinCode', '');
      setJoinCode('');
    }
  };

  const formikProps = useFormik({
    initialValues: {
      joinCode: joinCode,
    },
    validationSchema: enrollClassSchema,
    onSubmit: onEnrollClassSubmit,
  });

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`,
    );
    setScanned(true);
    setJoinCode(data);
    formikProps.setFieldValue('joinCode', data);
  };

  const enrollClassSchema = yup.object({
    joinCode: yup
      .string()
      .required('Please provide a session/class code')
      .min(10, 'Join code should be 10 characters')
      .max(10, 'Join code should be 10 characters'),
  });

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          {props.isLoading ? (
            <Container>
              <Content>
                <Spinner color="blue" />
              </Content>
            </Container>
          ) : (
            <View /* Title */ style={styles.container}>
              <Text style={styles.title}>Enroll New Class</Text>
              <View>
                <FormikInput
                  formikProps={formikProps}
                  field="joinCode"
                  placeholder="Join Code"
                  style={styles.formikField}
                />
                <Button
                  title="Join"
                  type={'primary'}
                  disabled={!formikProps.isValid}
                  onPress={formikProps.handleSubmit}
                  style={styles.button}
                />
              </View>
              <Button
                type={'secondary'}
                onPress={() => {
                  toggleQRScanner();
                }}
                title={
                  !useScanner ? 'Use QR Code Scanner' : 'Hide QR Code Scanner'
                }
                style={styles.lastButton}
              />
              {useScanner && (
                <>
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                    style={styles.barcodeScanner}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                  />
                  {scanned && (
                    <Button
                      style={styles.button}
                      title="Tap to Scan Again"
                      onPress={() => setScanned(false)}
                    />
                  )}
                </>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { currentJoinedSession, isLoading } = state.session;
  return {
    currentJoinedSession,
    isLoading,
  };
};

export default connect(mapStateToProps)(StudentJoinSession);

const styles = StyleSheet.create({
  container: {
    marginLeft: layout.spacing.xl,
    marginRight: layout.spacing.xl,
    marginTop: layout.spacing.xl,
  },
  barcodeScanner: {
    width: Dimensions.get('window').width - layout.spacing.xl * 2,
    height: 300,
    marginTop: layout.spacing.xl,
    marginBottom: layout.spacing.xl,
  },
  title: {
    ...font.h2,
    marginBottom: layout.spacing.sm,
  },
  bodyText: {
    ...font.medium,
    marginBottom: layout.spacing.md,
  },
  errorMsg: {
    marginBottom: layout.spacing.md,
  },
  button: {
    marginBottom: layout.spacing.xl,
  },
});
