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
  Pressable,
} from 'react-native';

import { Banner, Button } from '../components';
import { color, font, layout } from '../constants';

import { List, ListItem } from 'native-base';

import MapView from 'react-native-maps';

import QRCode from 'react-native-qrcode-generator';
import axios from 'axios';

import { resolveBaseURL, wait } from '../globals/globals';
import { connect } from 'react-redux';

const BASE_API_URL = resolveBaseURL();

const TeacherViewSession = props => {
  const { authToken } = props;
  const {
    _id: sessionID,
    name,
    description,
    maxStudents,
    shortID,
    createdAt,
    active,
  } = props?.route?.params?.session || {};

  const [isSessionActive, setisSessionActive] = useState(active);

  const getSessionParticipants = async () => {
    try {
      console.log('about to get participant list with ', sessionID);
      const participantList = await axios.request({
        method: 'post',
        url: `/api/sessions/getSessionParticipants`,
        baseURL: BASE_API_URL,
        data: { sessionID },
        headers: {
          'auth-token': authToken,
        },
      });
      console.log('got list of participants', participantList.data.data);
      setParticipantList(participantList.data.data);
    } catch (error) {
      console.log('retrieving stuff for session error', error);
    }
  };

  const activateSession = async sessionBoolean => {
    try {
      console.log('about to activate session with ', sessionID, sessionBoolean);
      const activateSessionResponse = await axios.request({
        method: 'post',
        url: `/api/sessions/activateSessionByID`,
        baseURL: BASE_API_URL,
        data: { sessionID, sessionBoolean },
        headers: {
          'auth-token': authToken,
        },
      });
      if (activateSessionResponse?.data?.data?.success) {
        console.log('confirm activation was successful');
        setisSessionActive(sessionBoolean);
      }
    } catch (error) {
      console.log('Error activating session', error);
    }
  };

  useEffect(() => {
    (async () => {
      await getSessionParticipants();
    })();
  }, []);

  const [participantList, setParticipantList] = useState([]);
  const [showQRCode, setshowQRCode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSessionParticipants();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.bodyText}>{description}</Text>
            <Text style={styles.bodyText}>Max Students: {maxStudents}</Text>
            <Text style={styles.bodyText}>Code: {shortID}</Text>
            <Text style={styles.bodyText}>Created: {createdAt}</Text>
            <Text style={styles.bodyText}>
              Status: {isSessionActive ? 'Active' : 'Closed'}
            </Text>
            <Text style={styles.subHeading}>Enrolled Students:</Text>
            <List>
              {participantList.map((participant, index) => {
                return (
                  <ListItem
                    onPress={() => {
                      console.log(participant);
                      props.navigation.navigate({
                        name: 'StudentResponseView',
                        params: { sessionID, studentID: participant.studentID },
                      });
                    }}
                    key={index}>
                    <View>
                      <View>
                        <Text
                          style={[styles.bodyText, { textAlign: 'center' }]}
                          key={participant.studentID}>
                          {participant.name}
                        </Text>
                      </View>
                    </View>
                  </ListItem>
                );
              })}
            </List>
            {participantList.length == 0 && (
              <Text
                style={
                  (styles.bodyText,
                  { textAlign: 'center', marginBottom: layout.spacing.xl })
                }>
                No students currently enrolled, (Swipe to refresh)
              </Text>
            )}
            <Button
              type="secondary"
              title={!showQRCode ? 'Generate QR Code' : 'Hide QR Code'}
              style={styles.button}
              onPress={() => {
                if (!showQRCode) {
                  setshowQRCode(true);
                } else {
                  setshowQRCode(false);
                }
              }}
            />

            {showQRCode && (
              <QRCode
                style={styles.map}
                value={shortID || ''}
                size={Dimensions.get('window').width - layout.spacing.xl * 2}
                bgColor="black"
                fgColor="white"
              />
            )}

            <Button
              type={isSessionActive ? 'danger' : 'primary'}
              onPress={() => {
                if (isSessionActive) {
                  activateSession(false);
                } else {
                  activateSession(true);
                }
              }}
              title={isSessionActive ? 'Close Session' : 'Activate Session'}
              style={styles.lastButton}
            />
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
