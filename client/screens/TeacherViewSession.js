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
} from 'react-native';

import { Button, Container, Content, Spinner } from 'native-base';

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
  } = props?.route?.params?.session || {};

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
          <View /* Title */ style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text>Description: {description}</Text>
            <Text>Max Students: {maxStudents}</Text>
            <Text>JOIN CODE: {shortID}</Text>
            <Text>Created At: {createdAt}</Text>
            <Button onPress={() => setshowQRCode(true)}>
              <Text>Generate QR Code</Text>
            </Button>
            {showQRCode && (
              <QRCode
                value={shortID || ''}
                size={200}
                bgColor="black"
                fgColor="white"
              />
            )}
          </View>

          <View style={styles.studentcontainer}>
            <Text style={styles.students}>Students Enrolled</Text>
            {participantList.map(participant => {
              return <Text key={participant}>{participant}</Text>;
            })}
          </View>

          <TouchableOpacity style={styles.startsessioncontainer}>
            <Text style={styles.startsession}>ACTIVATE SESSION</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    marginTop: 25,
    fontWeight: 'bold',
  },

  students: {
    marginTop: 10,
    marginLeft: 40,
    fontSize: 16,
  },

  pageBackButton: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 70,
  },

  startsession: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    color: '#FFFFFF',
    backgroundColor: '#1E4AE7',
    margin: 45,
    height: 40,
    textAlign: 'center',
    paddingVertical: 7,
    marginTop: 100,
  },
});
