import React from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, TextInput } from '../components';
import { color, font, layout } from '../constants';

export default function Login({ navigation }) {
  return (
    <SafeAreaView
      style={{
        marginTop: layout.defaultScreenMargins.vertical,
        marginHorizontal: layout.defaultScreenMargins.horizontal,
      }}>
      <TouchableHighlight
        style={{ width: 90 }}
        underlayColor={color.lightGray}
        onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back" size={30} color={color.darkGray} />
          <Text style={[font.caption, loginScreenStyles.backArrowText]}>
            Back
          </Text>
        </View>
      </TouchableHighlight>
      <Text style={[font.h1, { marginTop: layout.spacing.xxl }]}>Login</Text>
      <Text style={[font.caption, { marginTop: layout.spacing.md }]}>
        Enter your details below to log in.
      </Text>
      <View style={{ marginTop: layout.spacing.xxl }}>
        <TextInput placeholder="Email" style={loginScreenStyles.textInput} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          style={loginScreenStyles.textInput}
        />
      </View>
      <View style={{ marginTop: layout.spacing.lg }}>
        <Button primary title="Login" />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[font.body, loginScreenStyles.noAccountText]}>
            I don't have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const loginScreenStyles = StyleSheet.create({
  backArrowText: {
    fontFamily: font.fontFamily.medium,
    color: color.darkGray,
    marginLeft: layout.spacing.sm,
  },
  textInput: {
    marginBottom: layout.spacing.lg,
  },
  noAccountText: {
    marginTop: layout.spacing.lg,
    textAlign: 'center',
  },
});
