import { useLinkProps } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { ImageCapture } from '../components';

function ImageAuth(props, { submitAll, navigation }) {
  const { user } = props;

  const [tries, setTries] = useState(3);

  const onSubmission = result => {
    if (result.data.includes(user?._id) && !props.isTeacher) {
      // face auth success and matched with student user
      return console.log('Student Face Auth Success!');
      //iterate to next screen on student join class flow here
    } else if (result.data.includes(user?._id) && props.isTeacher) {
      // face auth success and matched with teacher user
      return props.setCreateClassIndex(1);
    } else if (!props.isTeacher && tries >= 0) {
      // student face auth FAIL (retry)
      setTries(tries - 1);
      return console.log(
        `Student Facial Recognition Failed. You have ${tries} attempts left`,
      );
    } else if (!props.isTeacher && tries === -1) {
      // student continues with failed Face Auth
      return console.log(
        'Student Face Authentication Failed. You have no attempts left.',
      );
      //iterate to next screen on student join class flow here
    }
    // display error
    return console.log('face does not match with current user ID.');
  };

  return (
    <SafeAreaView>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Image Authentication</Text>
        <Text style={styles.desc}>{props.msg}</Text>
      </View>
      <ImageCapture authType="login" onSubmission={onSubmission} />
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(ImageAuth);

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  //returnImage not used
  returnImage: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  returnButton: {
    width: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 10,
  },
  desc: {
    fontSize: 15,
    textAlign: 'center',
  },
  textContainer: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#3D3ABF',
    overflow: 'hidden',
  },
  imageContainer: {
    height: 300,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  nextButton: {
    height: 52,
    backgroundColor: '#3D3ABF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  photoButton: {
    height: 52,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    margin: 'auto',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonTextPhoto: {
    color: 'black',
    fontWeight: 'bold',
  },
});
