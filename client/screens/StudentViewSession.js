import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  RefreshControl,
  Dimensions,
} from 'react-native';

import { Banner, Button } from '../components';
import { color, font, layout } from '../constants';

import axios from 'axios';

import * as authActions from '../redux/actions/authActions';

import MapView from 'react-native-maps';

import { useIsFocused } from '@react-navigation/native';

import { resolveBaseURL, wait } from '../globals/globals';
import { connect, useDispatch } from 'react-redux';

const BASE_API_URL = resolveBaseURL();

const TeacherViewSession = props => {
  // console.log(props);
  const { authToken } = props;
  const { _id: sessionCode } = props?.route?.params?.session || {};
  const { justJoined = false } = props?.route?.params || {};

  const dispatch = useDispatch();

  const [sessionDetails, setSessionDetails] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [hasResponse, sethasResponse] = useState(false);

  const checkResponse = async sessionID => {
    try {
      dispatch(authActions.getThisUserSaga());
      const checkResponse = await axios.request({
        method: 'post',
        url: `/api/sessions/checkResponse`,
        baseURL: BASE_API_URL,
        data: { sessionID, studentID: props.user._id },
        headers: {
          'auth-token': authToken,
        },
      });
      return checkResponse.data.data.success;
    } catch (error) {
      console.log('Error checking response', error);
    }
  };

  const getSessionDetails = async () => {
    try {
      dispatch(authActions.getThisUserSaga());
      const sessionDetails = await axios.request({
        method: 'post',
        url: `/api/sessions/getSession`,
        baseURL: BASE_API_URL,
        data: { sessionCode },
        headers: {
          'auth-token': authToken,
        },
      });
      // console.log('got session details', sessionDetails.data.data);
      setSessionDetails(sessionDetails.data.data);
      setRegion({
        ...region,
        latitude: sessionDetails.data.data.locationCoordinates.latitude,
        longitude: sessionDetails.data.data.locationCoordinates.longitude,
      });
      const checkResponseResult = await checkResponse(
        sessionDetails.data.data._id,
      );
      sethasResponse(checkResponseResult);
    } catch (error) {
      console.log('retrieving stuff for session error', error);
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getSessionDetails();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      await getSessionDetails();
    })();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSessionDetails();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [region, setRegion] = useState({
    latitude: -33.9657,
    longitude: 151.1338,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const canStartAuthentication = () => {
    if (!sessionDetails.active) return false;
    if (props?.user?.authenticatedSessions?.includes(sessionCode)) return false;
    return true;
  };

  const onStartAuthButton = () => {
    props.navigation.navigate({
      name: 'StudentAuthenticationFlow',
      params: { sessionDetails },
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <Text style={styles.title}>{sessionDetails.name}</Text>
            <Text style={styles.bodyText}>{sessionDetails.description}</Text>
            {sessionDetails.startTime && (
              <Text style={styles.bodyText}>
                Start Time: {sessionDetails.startTime}
              </Text>
            )}
            {sessionDetails.endTime && (
              <Text style={styles.bodyText}>
                End Time: {sessionDetails.endTime}
              </Text>
            )}
            <Text style={font.mediumBold}>Class Location:</Text>
            <MapView style={styles.map} region={region}>
              <MapView.Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                title="Class Location"
                description="Your class/session is located here!"
              />
            </MapView>
            {sessionDetails.active ? (
              <Banner
                style={styles.errorMsg}
                type="success"
                message="This session currently active, please complete authentication if you haven't already."
              />
            ) : (
              <Banner
                style={styles.errorMsg}
                type="error"
                message="This session is not active yet, please check back later."
              />
            )}
            {props?.user?.authenticatedSessions?.includes(sessionCode) && (
              <Banner
                style={styles.errorMsg}
                type="generic"
                message="You have already made a submission for this session."
              />
            )}

            {justJoined && (
              <Banner
                style={styles.errorMsg}
                type="success"
                message="You just successfully joined this session, it will be saved in your session list."
              />
            )}

            {hasResponse && (
              <Banner
                style={styles.errorMsg}
                type="information"
                message="You have already authenticated for this session"
              />
            )}

            {!hasResponse && (
              <Button
                type="primary"
                title="Start Authentication"
                onPress={() => {
                  onStartAuthButton();
                }}
                disabled={!canStartAuthentication()}
                style={styles.button}
              />
            )}

            {hasResponse && (
              <Button
                type="primary"
                title="View Response"
                onPress={() => {
                  props.navigation.navigate({
                    name: 'StudentResponseView',
                    params: {
                      sessionID: sessionDetails._id,
                      studentID: props.user._id,
                    },
                  });
                }}
                disabled={!hasResponse}
                style={styles.button}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { user, authToken } = state.auth;
  return { user, authToken };
};

export default connect(mapStateToProps)(TeacherViewSession);

const styles = StyleSheet.create({
  container: {
    marginLeft: layout.spacing.xl,
    marginRight: layout.spacing.xl,
    marginTop: layout.spacing.sm,
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
