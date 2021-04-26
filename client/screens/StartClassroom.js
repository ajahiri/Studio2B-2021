import React /*, { useEffect, useState }*/ from 'react'; /* HN */
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Settings,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/* I'll need to put in that plus icon in there somehow, in accordance to the wireframe */
/* and also the tick where the user chooses which answer out of the 4 is correct */
/* The back button needs to be linked. atm it doesn't work */

export default function StartClassroom({ navigation }) {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View /* Title */ style={styles.container}>
          <Text style={styles.title}>Class Name</Text>
        </View>

        <View /* Question box - don't know how to do yet */
          style={styles.questioncontainer}>
          <Text style={styles.questionone}></Text>
        </View>

        <TextInput /* Text Box */
          style={styles.questioninput}
          placeholder="Question"
        />

        <TextInput /* Text Box */
          style={styles.answerone}
          placeholder="Answer 1"
        />

        <TextInput /* Text Box */
          style={styles.answertwo}
          placeholder="Answer 2"
        />

        <TextInput /* Text Box */
          style={styles.answerthree}
          placeholder="Answer 3"
        />

        <TextInput /* Text Box */
          style={styles.answerfour}
          placeholder="Answer 4"
        />

        <TouchableOpacity style={styles.submitcontainer}>
          <Text style={styles.submit}>SUBMIT</Text>
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

  /*
   questioncontainer : {
    
   },
   questionone : {
     margin: 35,
     borderWidth: 1,
     paddingHorizontal: 10,
     height: 300
   },
   */

  questioninput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 45,
    backgroundColor: '#E5E5E5',
    fontSize: 16,
  },

  answerone: {
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 45,
    marginTop: -25,
    backgroundColor: '#E5E5E5',
    fontSize: 16,
  },

  answertwo: {
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 45,
    marginTop: -25,
    backgroundColor: '#E5E5E5',
    fontSize: 16,
  },

  answerthree: {
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 45,
    marginTop: -25,
    backgroundColor: '#E5E5E5',
    fontSize: 16,
  },

  answerfour: {
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 45,
    marginTop: -25,
    backgroundColor: '#E5E5E5',
    fontSize: 16,
  },

  submit: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    color: '#FFFFFF',
    backgroundColor: '#1E4AE7',
    margin: 45,
    height: 40,
    textAlign: 'center',
    paddingVertical: 7,
    marginTop: 120,
  },

  pageBackButton: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 70,
  },
});
