import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function Home({ navigation }) {
  const logo = require("../../client/assets/Login/Logo.png");

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={logo} />
          <Text style={styles.title}>SES2B</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.registerText}>REGISTER</Text>
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
  view: {
    flexDirection: "column",
    flex: 1,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  logoImage: {
    height: 38,
    width: 38,
    marginRight: 20,
  },
  title: {
    fontSize: 48,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  loginButton: {
    width: 167,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    height: 52,
    marginLeft: 10,
    borderRadius: 7,
  },
  signInButton: {
    width: 167,
    justifyContent: "center",
    alignItems: "center",
    height: 52,
    marginLeft: 20,
    borderRadius: 7,
    backgroundColor: "#3D3ABf",
  },
  registerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },
  loginText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 13,
  },
});
