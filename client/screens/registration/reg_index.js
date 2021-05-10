import Register from '../Register';
import ImageAuthRegistration from './ImageAuthRegistration';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const reg_index = props => {
  const { reg_index, user } = props;

  return reg_index === 0 ? (
    <Register />
  ) : (
    <ImageAuthRegistration userToken={user?.userToken} userID={user?._id} />
  );
};

const mapStateToProps = state => {
  const { reg_index, user } = state.auth;
  return {
    reg_index,
    user,
  };
};

export default connect(mapStateToProps)(reg_index);

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  nextButton: {
    height: 52,
    backgroundColor: '#3D3ABF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    margin: 'auto',
    fontWeight: 'bold',
  },
});
