import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <View>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.detailContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.details}>Name: </Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.details}>ID: </Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.details}>Email: </Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.details}>Phone: </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  image: {
    height: 30,
    width: 30,
  },
  details: {
    marginTop: 5,
    fontSize: 16,
  },
  detailBox: {
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
  },
  detailContainer: {
    marginTop: 8,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#cccccc",
    width: "85%",
    borderRadius: 15,
  },
});
