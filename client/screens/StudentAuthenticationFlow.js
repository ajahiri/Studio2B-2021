import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';

import { Banner, Button } from '../components';
import { color, font, layout } from '../constants';

import { connect } from 'react-redux';

import ImageAuth from './ImageAuth';
import LocationAuth from './LocationAuth';

import axios from 'axios';
import { resolveBaseURL } from '../globals/globals';
import { setSessionLoading } from '../redux/actions/sessionActions';

const BASE_API_URL = resolveBaseURL();

const StudentAuthenticationFlow = props => {
  // const { name, description, maxStudents, shortID, createdAt } =
  //   props.currentJoinedSession || {};

  const [studentAuthIndex, setStudentAuthIndex] = useState(0);
  const [facialAuthResult, setfacialAuthResult] = useState(false);

  const getSession = async () => {
    try {
      const authToken = await SecureStore.getItemAsync('userToken');
      const response = await axios.request({
        method: 'post',
        url: `/api/sessions/joinSession`,
        baseURL: BASE_API_URL,
        data: { sessionCode: joinCode },
        headers: {
          'auth-token': authToken,
        },
      });
      console.log(response.data);
    } catch (error) {}
  };

  // Result is just a true/false
  const onStudentFaceAuth = result => {
    setfacialAuthResult(true);
    setStudentAuthIndex(1);
  };

  // Result is a {lat, lng}
  const onLocationAuthSubmit = result => {
    console.log('location auth submitted', result);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          {studentAuthIndex === 0 && (
            <View style={styles.container}>
              <ImageAuth
                msg="Please complete the facial recognition authentication. You have 3 attempts before being marked as a fail."
                onStudentFaceAuth={onStudentFaceAuth}
                isTeacher={false}
              />
            </View>
          )}
          {studentAuthIndex === 1 && (
            <LocationAuth
              onLocationAuthSubmit={onLocationAuthSubmit}
              isTeacher={false}
            />
          )}
          {studentAuthIndex === 2 && (
            <View style={styles.container}>
              <Text style={styles.title}>Interactive Authentication</Text>
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

export default connect(mapStateToProps)(StudentAuthenticationFlow);

const styles = StyleSheet.create({
  container: {
    marginLeft: layout.spacing.xl,
    marginRight: layout.spacing.xl,
    marginTop: layout.spacing.xl,
  },
  map: {
    width: Dimensions.get('window').width - layout.spacing.xl * 2,
    height: Dimensions.get('window').height / 3,
    marginBottom: layout.spacing.xxl,
  },
  title: {
    ...font.h2,
    marginBottom: layout.spacing.sm,
  },
  subHeading: {
    ...font.h3,
    marginBottom: layout.spacing.md,
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
  lastButton: {
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.xxl,
  },
});
