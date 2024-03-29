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

import { Banner, Button, ImageCapture } from '../components';
import { color, font, layout } from '../constants';

function ImageAuth(props) {
  const { user } = props;

  const [tries, setTries] = useState(3);
  const [showBanner, setshowBanner] = useState(false);

  const onSubmission = result => {
    if (props.isTeacher) {
      // Teacher
      if (result.data && result.data.includes(user?._id)) {
        // face auth success and matched with teacher user
        props.setCreateClassIndex(1);
      }
      // Do nothing in fail case for teacher, they can retry as much as
      // they like since this is NEEDED to pass to next step
    } else {
      // Student
      if (result.data && result.data.includes(user?._id)) {
        // face auth success and matched with student user
        console.log('Student Face Auth Success!');
        props.onStudentFaceAuth(true);
      } else {
        console.log('Student auth no match.');
        setshowBanner(true);
        if (tries > 1) {
          // Let them know how many tries left and go again
          setTries(tries - 1);
        } else {
          // No tries left, continue for student but mark as failed
          props.onStudentFaceAuth(false);
        }
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Image Authentication</Text>
        <Text style={styles.desc}>{props.msg}</Text>
      </View>
      <ImageCapture authType="login" onSubmission={onSubmission} />
      {showBanner && (
        <Banner
          style={[styles.errorMsg, { marginTop: layout.spacing.md }]}
          type="information"
          message={`Authentication failed, you have ${tries} tries remaining.`}
        />
      )}
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
    marginLeft: layout.spacing.xl,
    marginRight: layout.spacing.xl,
    marginTop: layout.spacing.sm,
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
