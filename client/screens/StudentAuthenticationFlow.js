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

import ImageAuth from './ImageAuth';
import LocationAuth from './LocationAuth';

import axios from 'axios';
import { resolveBaseURL } from '../globals/globals';
import { setSessionLoading } from '../redux/actions/sessionActions';

import * as SecureStore from 'expo-secure-store';

const BASE_API_URL = resolveBaseURL();

const StudentAuthenticationFlow = props => {
  const session = props?.route?.params?.sessionDetails || {};

  const answerArray = new Array(session?.questions?.length).fill('');

  const [studentAuthIndex, setStudentAuthIndex] = useState(0);
  const [facialAuthResult, setfacialAuthResult] = useState(false);
  const [locationAuthResult, setLocationAuthResult] = useState({});
  const [questionAnswers, setquestionAnswers] = useState(answerArray);
  const [isLoading, setisLoading] = useState(false);
  const [submitError, setsubmitError] = useState('');

  console.log('Passed session details:', session);

  // Result is just a true/false
  const onStudentFaceAuth = result => {
    setfacialAuthResult(result);
    setStudentAuthIndex(1);
  };

  // Result is a {lat, lng}
  const onLocationAuthSubmit = result => {
    setLocationAuthResult(result);
    setStudentAuthIndex(2);
    console.log('location auth submitted', result);
  };

  const onAnswerSelect = (value, questionIndex) => {
    console.log('value:', value, questionIndex);
    const updatedArray = questionAnswers;
    updatedArray[questionIndex] = value;
    setquestionAnswers(updatedArray);
  };

  const submitStudentResponse = async () => {
    setisLoading(true);
    console.log('Facial result', facialAuthResult);
    console.log('Location result', locationAuthResult);
    console.log('Interactive result', questionAnswers);

    // Build array of Q/A
    const questionAnswer = [];
    questionAnswers.forEach((qa, index) => {
      const singleAnswer = {
        questionString: session.questions[index].questionString,
        responseString: session.questions[index].options[qa],
      };
      questionAnswer.push(singleAnswer);
    });
    console.log('response', questionAnswer);

    try {
      const authToken = await SecureStore.getItemAsync('userToken');
      const response = await axios({
        method: 'post',
        url: `/api/sessions/processResponse`,
        baseURL: BASE_API_URL,
        data: {
          sessionID: session._id,
          facialAuthResult,
          locationAuthResult,
          questionAnswer,
        },
        headers: {
          'auth-token': authToken,
        },
      });
      console.log('Processed your response ', response);
      setisLoading(false);
      props.navigation.navigate({
        name: 'StudentResponseView',
        params: {
          sessionID: response.data.data.data.sessionID,
          studentID: response.data.data.data.studentID,
        },
      });
    } catch (err) {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log(err.response);
        setsubmitError(err.response.data);
      } else if (err.request) {
        // client never received a response, or request never left
        console.log(err.request);
        setsubmitError(JSON.stringify(err.request));
      } else {
        // anything else
        console.log(err);
        setsubmitError(
          'Unexpected error occured while submitting your response.',
        );
      }
      setisLoading(false);
    }
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
            <View>
              <LocationAuth
                onLocationAuthSubmit={onLocationAuthSubmit}
                isTeacher={false}
              />
            </View>
          )}
          {studentAuthIndex === 2 && (
            <View style={styles.container}>
              <Text style={styles.title}>Interactive Authentication</Text>
              <Text style={styles.bodyText}>
                Please answer the below questions to the best of your ability.
              </Text>
              {session.questions.map((question, indexQuestion) => {
                return (
                  <Content key={`${indexQuestion}-QUESTION`}>
                    <Form>
                      <Text style={styles.subHeading}>
                        {question.questionString}
                      </Text>
                      <Item style={styles.questionPicker} picker>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Select answer"
                          placeholderStyle={{ color: '#111' }}
                          placeholderIconColor="#007aff"
                          style={{ height: 50 }}
                          onValueChange={itemValue => {
                            onAnswerSelect(itemValue, indexQuestion);
                          }}>
                          {question.options.map((option, indexAnswer) => {
                            return (
                              <Picker.Item
                                key={`${indexAnswer}-${indexQuestion}-ANSWER`}
                                label={option}
                                value={indexAnswer}
                              />
                            );
                          })}
                        </Picker>
                      </Item>
                    </Form>
                  </Content>
                );
              })}
              <Button
                type={'primary'}
                onPress={() => {
                  submitStudentResponse();
                }}
                title={'Submit'}
                style={styles.lastButton}
                isLoading={isLoading}
              />
              {submitError !== '' ? (
                <Banner type="error" message={submitError} />
              ) : (
                <></>
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

export default connect(mapStateToProps)(StudentAuthenticationFlow);

const styles = StyleSheet.create({
  container: {
    marginLeft: layout.spacing.xl,
    marginRight: layout.spacing.xl,
    marginTop: layout.spacing.huge,
  },
  questionPicker: {
    marginBottom: layout.spacing.md,
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
});
