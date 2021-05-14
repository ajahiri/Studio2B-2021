import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import { List, ListItem } from 'native-base';

// Form validation
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikInput from '../components/FormikInput';

import { colours as C, layout as L, typography as T } from '../constants';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Button from '../components/Button';
import { useDispatch, connect } from 'react-redux';
import {
  createNewSessionSaga,
  setSessionLoading,
} from '../redux/actions/sessionActions';

import ImageAuth from './ImageAuth';

const createClassroomSchema = yup.object({
  sessionName: yup
    .string()
    .required('Please provide class name')
    .min(3, 'Class name should have at least 3 characters'),
  sessionDescription: yup
    .string()
    .required('Please provide class description')
    .min(3, 'Class description should have at least 3 characters'),
  maxStudents: yup
    .number()
    .required('Please provide the max number of students')
    .min(1, 'Max students must be greater or equal to 1.'),
});

const createQuestionSchema = yup.object({
  questionString: yup
    .string()
    .required('Please provide question string')
    .min(3, 'Question string should have at least 3 characters'),
  questionOption1: yup
    .string()
    .required('Please provide valid question option')
    .min(3, 'Question option should have at least 3 characters'),
  questionOption2: yup
    .string()
    .required('Please provide valid question option')
    .min(3, 'Question option should have at least 3 characters'),
  questionOption3: yup
    .string()
    .required('Please provide valid question option')
    .min(3, 'Question option should have at least 3 characters'),
  questionOption4: yup
    .string()
    .required('Please provide valid question option')
    .min(3, 'Question option should have at least 3 characters'),
  questionAnswer: yup
    .number()
    .required('Please provide a valid correct option number')
    .min(1, 'Only 4 options, please input number between 1 and 4')
    .max(4, 'Only 4 options, please input number between 1 and 4'),
});

const TeacherCreateSession = props => {
  const dispatch = useDispatch();
  const [classDetails, setclassDetails] = useState({
    sessionName: '',
    sessionDescription: '',
    maxStudents: '',
  });

  const [createClassIndex, setcreateClassIndex] = useState(0);

  const [sessionQuestions, setsessionQuestions] = useState([]);

  const onCreateClassroomSubmit = values => {
    console.log(values);
    setclassDetails(values);
    setcreateClassIndex(2);
  };

  const goBackStep = () => {
    setcreateClassIndex(createClassIndex - 1);
  };

  const handleAddQuestion = (values, { resetForm }) => {
    // Resolve the question to a viable question object for storage
    const options = [
      values.questionOption1,
      values.questionOption2,
      values.questionOption3,
      values.questionOption4,
    ];
    const resolvedQuestion = {
      questionString: values.questionString,
      options,
      answer: options[values.questionAnswer - 1],
    };
    setsessionQuestions([...sessionQuestions, resolvedQuestion]);
    resetForm();
  };

  const onFinalSubmission = () => {
    if (sessionQuestions.length < 1) {
      Alert.alert(
        'Error',
        'You must add at least 1 question for this session.',
        [{ text: 'OK' }],
      );
      return;
    }
    dispatch(setSessionLoading(true));
    // Construct session object to send to backend through Redux
    const sessionObject = {
      name: classDetails.sessionName,
      description: classDetails.sessionDescription,
      maxStudents: classDetails.maxStudents,
      questions: sessionQuestions,
    };
    dispatch(createNewSessionSaga(sessionObject));
    setsessionQuestions([]);
    setcreateClassIndex(0);
    props.navigation.navigate('ViewSession');
    // console.log(classDetails, sessionQuestions);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          {createClassIndex === 0 && (
            <View style={styles.pageContainer}>
              <ImageAuth
                msg="this is the message"
                setCreateClassIndex={setcreateClassIndex}
                isTeacher={true}
              />
            </View>
          )}
          {createClassIndex === 1 && (
            <View style={styles.pageContainer}>
              <Formik
                initialValues={{
                  sessionName: classDetails.sessionName,
                  sessionDescription: classDetails.sessionDescription,
                  maxStudents: classDetails.maxStudents,
                }}
                onSubmit={onCreateClassroomSubmit}
                validationSchema={createClassroomSchema}>
                {props => (
                  <View>
                    <Text>Class Info</Text>
                    <FormikInput
                      formikProps={props}
                      field="sessionName"
                      placeholder="Class Name"
                      style={styles.formikField}
                    />
                    <FormikInput
                      formikProps={props}
                      field="sessionDescription"
                      placeholder="Class Description"
                      style={styles.formikField}
                    />
                    <FormikInput
                      formikProps={props}
                      field="maxStudents"
                      placeholder="Max. Number of Students"
                      style={styles.formikField}
                    />
                    <Button
                      text="Next"
                      disabled={!props.isValid}
                      onPress={props.handleSubmit}
                      style={styles.formSubmitButton}
                    />
                  </View>
                )}
              </Formik>
            </View>
          )}
          {createClassIndex === 2 && (
            <View style={styles.pageContainer}>
              <Text>Questions</Text>
              <Text>
                Add Questions for "{classDetails.sessionName}" class interactive
                authentication. These may be relevant to the content of the
                class to ensure students are actively participating.
              </Text>

              {sessionQuestions.length > 0 && (
                <Text>Current Question Set:</Text>
              )}

              {/* !!This list needs to be improved, looks horrible ATM!! */}
              <List>
                {sessionQuestions.map((question, index) => {
                  return (
                    <ListItem key={index}>
                      <Text>
                        Q: {question.questionString} A: {question.answer}
                      </Text>
                    </ListItem>
                  );
                })}
              </List>

              <Formik
                initialValues={{
                  questionString: '',
                  questionOption1: '',
                  questionOption2: '',
                  questionOption3: '',
                  questionOption4: '',
                  questionAnswer: '',
                }}
                onSubmit={handleAddQuestion}
                validationSchema={createQuestionSchema}>
                {props => (
                  <View>
                    <FormikInput
                      formikProps={props}
                      field="questionString"
                      placeholder="Question"
                      style={styles.formikField}
                    />
                    <FormikInput
                      formikProps={props}
                      field="questionOption1"
                      placeholder="Option 1"
                      style={styles.formikField}
                    />
                    <FormikInput
                      formikProps={props}
                      field="questionOption2"
                      placeholder="Option 2"
                      style={styles.formikField}
                    />
                    <FormikInput
                      formikProps={props}
                      field="questionOption3"
                      placeholder="Option 3"
                      style={styles.formikField}
                    />
                    <FormikInput
                      formikProps={props}
                      field="questionOption4"
                      placeholder="Option 4"
                      style={styles.formikField}
                    />
                    <FormikInput
                      formikProps={props}
                      field="questionAnswer"
                      placeholder="Correct answer option, i.e. 1,2,3 or 4."
                      style={styles.formikField}
                    />
                    <Button
                      text="Add"
                      disabled={!props.isValid}
                      onPress={props.handleSubmit}
                      style={styles.formSubmitButton}
                    />
                  </View>
                )}
              </Formik>
              <Button
                text="Finish"
                onPress={onFinalSubmission}
                style={styles.formSubmitButton}
              />
              <Button
                text="Back"
                onPress={goBackStep}
                style={styles.formSubmitButton}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TeacherCreateSession;

const styles = StyleSheet.create({
  pageContainer: {
    marginHorizontal: L.pageMarginHorizontal,
    minHeight: 1500, // Hack fix so scrollview doesnt cut off content
  },
  pageBackButton: {
    position: 'absolute',
  },
  registerTitle: {
    marginTop: L.spacing.xxl,
    marginBottom: L.spacing.xl,
  },
  formikField: {
    marginBottom: L.spacing.l,
  },
  formSubmitButton: {
    marginTop: L.spacing.m,
  },

  formikField: {
    marginBottom: L.spacing.l,
  },
  formSubmitButton: {
    marginTop: L.spacing.m,
  },

  createclassroomcontainer: {},

  createclassroom: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    color: '#FFFFFF',
    backgroundColor: '#1E4AE7',
    margin: 30,
    height: 40,
    textAlign: 'center',
    paddingVertical: 7,
    marginTop: 150,
  },
});
