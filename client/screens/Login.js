import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { TextInput } from "react-native-gesture-handler";

export default function Login() {
  const returnImage = require("../../client/assets/Login/Union.png");
  const logo = require("../../client/assets/Login/Logo.png");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = email => {
    setEmail(email);
  };

  const onChangePassword = password => {
    setPassword(password);
  };

  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.returnImage}>
          <Image source={returnImage} />
        </View>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={onChangeEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onChangePassword}
          />
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
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
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
  },
  forgotPassword: {
    color: "#828489",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
