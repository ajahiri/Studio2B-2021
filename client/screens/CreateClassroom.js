import React /*, { useEffect, useState }*/ from 'react'; /* HN */
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  /* Image, */
  /* Settings */
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/* The back button needs to be linked. atm it doesn't work */

export default function CreateClassroom({ navigation }) {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View /* Title */ style={styles.container}>
          <Text style={styles.title}>Create Classroom</Text>
        </View>

        <TextInput /* Text Box */
          style={styles.classnameinput}
          placeholder="Class Name"
        />

        <TextInput
          style={styles.numberofstudentsinput}
          placeholder="Number of Students"
          keyboardType="numeric" /* shows numbers on keypad only */
        />

        <TextInput style={styles.startdateinput} placeholder="Start Date" />

        <TextInput style={styles.occuranceinput} placeholder="Occurance" />

        <TouchableOpacity style={styles.createclassroomcontainer}>
          <Text style={styles.createclassroom}>CREATE CLASSROOM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageBackButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    marginTop: 25,
    fontWeight: 'bold',
  },

  classnameinput: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 10 /* doesn't make the text inside the box close to the border */,
    fontSize: 18,
  },

  numberofstudentsinput: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 10,
    marginTop: -5,
    fontSize: 18,
  },

  startdateinput: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 10,
    marginTop: -5,
    fontSize: 18,
  },

  occuranceinput: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 10,
    marginTop: -5,
    fontSize: 18,
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

  pageBackButton: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 50,
  },
});
