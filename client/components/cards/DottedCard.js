import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from './Card';
import { color, font, layout } from '../../constants';

export default function DottedCard({ icon, message, onPress, ...props }) {
  return (
    <Card onPress={onPress} style={[dottedCardStyles.card, props.style]}>
      <View style={[dottedCardStyles.cardContent]}>
        <Ionicons name={icon} size={40} color={color.gray} />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[font.largeBold, dottedCardStyles.cardText]}>
          {message}
        </Text>
      </View>
    </Card>
  );
}

DottedCard.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
  onPress: PropTypes.func,
};

DottedCard.defaultProps = {
  icon: 'add',
  message: '',
  onPress: () => {},
};

const dottedCardStyles = StyleSheet.create({
  card: {
    height: 80,
    borderColor: color.gray,
    borderStyle: 'dashed',
    // backgroundColor: color.white,
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
