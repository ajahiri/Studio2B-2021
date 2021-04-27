import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, TextInput } from '../components';
import { color, font, layout } from '../constants';

function RegisterHeader({ navigation }) {
  return (
    <>
      <TouchableHighlight
        style={{ width: 90 }}
        underlayColor={color.lightGray}
        onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back" size={30} color={color.darkGray} />
          <Text style={[font.caption, registerScreenStyles.backArrowText]}>
            Back
          </Text>
        </View>
      </TouchableHighlight>
      <Text style={[font.h1, { marginTop: layout.spacing.xxl }]}>Hello 👋</Text>
      <Text style={[font.caption, { marginTop: layout.spacing.md }]}>
        To register an account with AuthMe, fill in the details below with.
      </Text>
    </>
  );
}

function RegisterBody({ navigation }) {
  return (
    <>
      <View style={{ marginTop: layout.spacing.xxl }}>
        <TextInput placeholder="Name" style={registerScreenStyles.textInput} />
        <TextInput placeholder="Email" style={registerScreenStyles.textInput} />
        <TextInput
          secureTextEntry
          placeholder="Password"
          style={registerScreenStyles.textInput}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          style={registerScreenStyles.textInput}
        />
      </View>
      <View style={{ marginTop: layout.spacing.lg }}>
        <Button primary disabled title="Next" />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[font.body, registerScreenStyles.noAccountText]}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default function Register({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={layout.spacing.lg}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            marginTop: layout.defaultScreenMargins.vertical,
            marginHorizontal: layout.defaultScreenMargins.horizontal,
          }}>
          <RegisterHeader navigation={navigation} />
          <RegisterBody navigation={navigation} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const registerScreenStyles = StyleSheet.create({
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
