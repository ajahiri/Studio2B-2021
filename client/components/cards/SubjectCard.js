import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

import Card from './Card';
import { color, font } from '../../constants';

export default function SubjectCard({ subjectName, onPress, ...props }) {
  return (
    <Card onPress={onPress} style={[subjectCardStyles.container, props.style]}>
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={[font.mediumBold, subjectCardStyles.subjectName]}>
        {subjectName}
      </Text>
    </Card>
  );
}

SubjectCard.propTypes = {
  subjectName: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

SubjectCard.defaultProps = {
  subjectName: 'Subject',
  onPress: () => {},
};

const subjectCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    backgroundColor: color.white,
    borderColor: color.black,
    borderBottomWidth: 5,
  },
  subjectName: {
    padding: 15,
  },
});
