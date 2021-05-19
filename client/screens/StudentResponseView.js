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

import { Picker, Icon, Form, Item, Content } from 'native-base';

import { Banner, Button } from '../components';
import { color, font, layout } from '../constants';

import { connect } from 'react-redux';

import moment from 'moment';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

import MapView from 'react-native-maps';

import axios from 'axios';
import { resolveBaseURL } from '../globals/globals';
import * as SecureStore from 'expo-secure-store';

const BASE_API_URL = resolveBaseURL();

const StudentResponseView = props => {
  const { sessionID, studentID } = props?.route?.params || {};
  const [isLoading, setisLoading] = useState(true);
  const [errorLoading, seterrorLoading] = useState('');
  const [responseDetails, setresponseDetails] = useState({});
  const [tableData, settableData] = useState([]);

  useEffect(() => {
    getResponseDetails();
  }, []);

  const getResponseDetails = async () => {
    try {
      const authToken = await SecureStore.getItemAsync('userToken');
      const response = await axios({
        method: 'post',
        url: `/api/sessions/getStudentResponse`,
        baseURL: BASE_API_URL,
        data: {
          sessionID,
          studentID,
        },
        headers: {
          'auth-token': authToken,
        },
      });
      setisLoading(false);
      setresponseDetails(response.data.data.targetResponse);
      setRegion({
        ...region,
        latitude: response.data.data.targetResponse.studentLocation[0],
        longitude: response.data.data.targetResponse.studentLocation[1],
      });
      processTableData(response.data.data.targetResponse.questionResponses);
      console.log(response.data.data.targetResponse);
    } catch (err) {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        seterrorLoading(err.response.data);
      } else if (err.request) {
        // client never received a response, or request never left
        console.log(err.request);
        seterrorLoading(err.request);
      } else {
        // anything else
        console.log(err);
        seterrorLoading('Unexpected error loading response details.');
      }
      setisLoading(false);
    }
  };

  const createdAtDate = new Date(responseDetails?.createdAt);

  const [region, setRegion] = useState({
    latitude: -33.9657,
    longitude: 151.1338,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const tableHead = ['Question', 'Response', 'Answer', 'Result'];

  const processTableData = questionResponses => {
    let tableDataOutput = [];
    const questionArray = questionResponses;
    questionArray.forEach(question => {
      let correct = 'WRONG';
      if (question.correct) correct = 'CORRECT';
      const x = [
        question.questionString,
        question.answerString,
        question.responseString,
        correct,
      ];
      tableDataOutput.push(x);
    });
    settableData(tableDataOutput);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Student Response</Text>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <>
                {!errorLoading && (
                  <>
                    <Text style={styles.subHeading}>
                      {`${responseDetails?.studentFullName}'s Response`}
                    </Text>
                    <Text style={styles.bodyText}>
                      Submitted At:{' '}
                      {moment(createdAtDate).format('Do MMMM YYYY, h:mm:ss a')}
                    </Text>
                    <Text style={styles.subHeading}>Facial Auth Result</Text>
                    <Text style={styles.bodyText}>
                      Student{' '}
                      {responseDetails.facialAuthSuccess ? 'PASSED' : 'FAILED'}{' '}
                      facial authentication.
                    </Text>
                    <Text style={styles.subHeading}>Location Auth Result</Text>
                    <Text style={styles.bodyText}>
                      Student {responseDetails.gpsSuccess ? 'PASSED' : 'FAILED'}{' '}
                      location authentication.
                    </Text>
                    <MapView style={styles.map} region={region}>
                      <MapView.Marker
                        coordinate={{
                          latitude: region.latitude,
                          longitude: region.longitude,
                        }}
                        title="Student Location"
                        description="Student's recorded location for this submission."
                      />
                    </MapView>
                    <Text style={styles.bodyText}>
                      Distance from Class:{' '}
                      {Math.round(responseDetails.distance * 10000) / 100}(m)
                    </Text>
                    <Text style={styles.subHeading}>
                      Interactive Auth Result
                    </Text>
                    <View style={styles.tableStyle}>
                      <Table
                        borderStyle={{
                          borderWidth: 2,
                          borderColor: '#c8e1ff',
                        }}>
                        <Row
                          data={tableHead}
                          style={styles.head}
                          textStyle={styles.text}
                        />
                        <Rows data={tableData} textStyle={styles.text} />
                      </Table>
                    </View>
                  </>
                )}
              </>
            )}
            {errorLoading !== '' ? (
              <Banner type="error" message={JSON.stringify(errorLoading)} />
            ) : (
              <></>
            )}
          </View>
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

export default connect(mapStateToProps)(StudentResponseView);

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
    marginTop: layout.spacing.xxl,
    marginBottom: layout.spacing.xxl,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  tableStyle: {
    marginBottom: layout.spacing.xl,
  },
});
