import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function ImageAuthRegistration({ navigation }) {
  const returnImage = require("../../client/assets/Login/Union.png");
  const imagePlaceholder = require("../../client/assets/Login/profile-placeholder.png");

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
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Image Authentication</Text>
        <Text style={styles.desc}>
          In order to register your account, you’re required to upload a facial
          image. This image will be used for future authentication.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imagePlaceholder} />
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
  returnImage: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  returnButton: {
    width: 20,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 10,
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
  },
  textContainer: {
    padding: 20,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#3D3ABF",
    overflow: "hidden",
  },
  imageContainer: {
    paddingTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
