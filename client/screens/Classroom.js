import React /*, { useEffect, useState }*/ from 'react'; /* HN */
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/* The start session button seems to activate even on the white part of the screen :( I wasn't sure how to  */
/* The back button needs to be linked. atm it doesn't work */

export default function CreateClassroom({ navigation }) {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <View /* Title */ style={styles.container}>
            <Text style={styles.title}>Class Name</Text>
          </View>

          <TouchableOpacity
            style={styles.pageBackButton}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" />
          </TouchableOpacity>

          <View style={styles.studentcontainer}>
            <Text style={styles.students}>Students</Text>
          </View>

          <TouchableOpacity style={styles.startsessioncontainer}>
            <Text style={styles.startsession}>START SESSION</Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginTop: 400,
  },
});
