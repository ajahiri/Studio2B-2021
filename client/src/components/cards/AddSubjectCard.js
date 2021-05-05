import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from './Card';
import { color } from '../../constants';

export default function AddSubjectCard({ subjectName, onPress, ...props }) {
  return (
    <Card
      onPress={onPress}
      style={[addSubjectCardStyles.container, props.style]}>
      <Ionicons name="add" size={60} color={color.gray} />
    </Card>
  );
}

AddSubjectCard.propTypes = {
  subjectName: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

AddSubjectCard.defaultProps = {
  subjectName: 'Subject',
  onPress: () => {},
};

const addSubjectCardStyles = StyleSheet.create({
  container: {
    borderColor: color.gray,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
