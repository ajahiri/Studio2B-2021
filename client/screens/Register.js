import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/Feather";

import { TextInput } from "react-native-gesture-handler";

export default function Register({ navigation }) {
  const returnImage = require("../../client/assets/Login/Union.png");
  const logo = require("../../client/assets/Login/Logo.png");

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.returnButton}
        >
          <View style={styles.returnImage}>
            <Image source={returnImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="First Name"></TextInput>
          <TextInput style={styles.input} placeholder="Last Name"></TextInput>
          <TextInput style={styles.input} placeholder="University"></TextInput>
          <TextInput style={styles.input} placeholder="Email"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.checkBoxContainer}>
          <View style={styles.checkBox}>
            <CheckBox style={{ boxType: "circle", lineWidth: 10 }} />
            <Text>Register as Teacher?</Text>
          </View>
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ImageAuthRegistration")}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimerText}>
            By signing up, you agree to SES2B’s Terms of Service and Privacy
            Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  form: {
    paddingTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    height: 52,
    marginBottom: 20,
    paddingLeft: 20,
  },
  returnImage: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoImage: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  loginButton: {
    height: 52,
    backgroundColor: "#3D3ABF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    margin: "auto",
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#828489",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  returnButton: {
    width: 20,
  },
  checkBox: {
    backgroundColor: "#C8CCFF",
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 7,
    padding: 7,
  },
  checkBoxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -10,
  },
  loginButtonContainer: {
    paddingTop: 10,
  },
  disclaimerText: {
    fontSize: 12,
    paddingTop: 10,
  },
});
