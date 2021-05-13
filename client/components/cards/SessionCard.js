import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import Card from './Card';
import { color, font } from '../../constants';

export default function SessionCard({ subjectName, onPress, ...props }) {
  return (
    <Card onPress={onPress} style={[sessionCardStyles.container, props.style]}>
      <View style={sessionCardStyles.content}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[font.mediumBold, sessionCardStyles.subjectName]}>
          {subjectName}
        </Text>
        <Text>(session details)</Text>
      </View>
    </Card>
  );
}

SessionCard.propTypes = {
  subjectName: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

SessionCard.defaultProps = {
  subjectName: 'Subject',
  onPress: () => {},
};

const SHADOW_DEPTH = 5;

const sessionCardStyles = StyleSheet.create({
  container: {
    height: 80 + SHADOW_DEPTH,
    borderBottomWidth: SHADOW_DEPTH,
    backgroundColor: color.white,
    borderColor: color.black,
  },
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
});
