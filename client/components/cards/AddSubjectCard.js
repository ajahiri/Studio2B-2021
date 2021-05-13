import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from './Card';
import { color, font, layout } from '../../constants';

export default function AddSubjectCard({
  subjectName,
  isTeacher,
  onPress,
  ...props
}) {
  return (
    <Card onPress={onPress} style={[addSubjectCardStyles.card, props.style]}>
      <View style={[addSubjectCardStyles.cardContent]}>
        <Ionicons name="add" size={40} color={color.gray} />
        <Text
          ellipsizeMode="tail"
          style={[font.largeBold, addSubjectCardStyles.cardText]}>
          {isTeacher ? 'Add' : 'Join'} New Class
        </Text>
      </View>
    </Card>
  );
}

AddSubjectCard.propTypes = {
  subjectName: PropTypes.string.isRequired,
  isTeacher: PropTypes.bool,
  onPress: PropTypes.func,
};

AddSubjectCard.defaultProps = {
  subjectName: 'Subject',
  isTeacher: false,
  onPress: () => {},
};

const addSubjectCardStyles = StyleSheet.create({
  card: {
    height: 80,
    borderColor: color.gray,
    borderStyle: 'dashed',
  },
  cardContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.spacing.lg,
  },
  cardText: {
    marginLeft: layout.spacing.md * 1.5,
  },
});
