import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from './Card';
import { color, font, layout } from '../../constants';

const ICON_SIZE = 20;

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
        <View style={sessionCardStyles.detailContainer}>
          <View style={sessionCardStyles.detail}>
            <Ionicons name="calendar" size={ICON_SIZE} />
            <Text style={sessionCardStyles.detailText}>01/01/2021</Text>
          </View>
          <View style={sessionCardStyles.detail}>
            <Ionicons name="person" size={ICON_SIZE} />
            <Text style={sessionCardStyles.detailText}>8</Text>
          </View>
        </View>
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
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: layout.spacing.md * 1.5,
  },
  detailText: {
    ...font.smallBold,
    marginLeft: layout.spacing.sm,
  },
});
