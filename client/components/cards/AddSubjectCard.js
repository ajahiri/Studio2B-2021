import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from './Card';
import { color, font } from '../../constants';

export default function AddSubjectCard({
  isTeacher,
  subjectName,
  onPress,
  ...props
}) {
  return (
    <Card
      onPress={onPress}
      style={[addSubjectCardStyles.container, props.style]}>
      <Text ellipsizeMode="tail" style={[font.mediumBold]}>
        {isTeacher ? 'Add' : 'Join'} New Class
      </Text>
      <Ionicons name="add" size={40} color={color.gray} />
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
    height: 80,
    borderColor: color.gray,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
});
