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

import { connect } from 'react-redux';

/* The start session button seems to activate even on the white part of the screen :( I wasn't sure how to  */
/* The back button needs to be linked. atm it doesn't work */

const TeacherViewSession = props => {
  const { name, description, maxStudents, shortID, createdAt } =
    props.currentCreatedSession || {};
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          {props.isLoading ? (
            <>
              <Text>Loading...</Text>
            </>
          ) : (
            <>
              <View /* Title */ style={styles.container}>
                <Text style={styles.title}>{name}</Text>
                <Text>Description: {description}</Text>
                <Text>Max Students: {maxStudents}</Text>
                <Text>JOIN CODE: {shortID}</Text>
                <Text>Created At: {createdAt}</Text>
              </View>

              <View style={styles.studentcontainer}>
                <Text style={styles.students}>Students</Text>
              </View>

              <TouchableOpacity style={styles.startsessioncontainer}>
                <Text style={styles.startsession}>START SESSION</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { currentCreatedSession, isLoading } = state.session;
  return {
    currentCreatedSession,
    isLoading,
  };
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
    marginTop: 400,
  },
});
