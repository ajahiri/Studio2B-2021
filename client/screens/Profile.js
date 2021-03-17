import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <View style={styles.detailBox}>
        <Text style={styles.details}>Name: </Text>
        <Text style={styles.details}>ID: </Text>
        <Text style={styles.details}>Email: </Text>
        <Text style={styles.details}>Phone: </Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  details: {
    marginTop: 5,
    fontSize: 16,
  },
  detailBox: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: "#cccccc",
    width: "85%",
    borderRadius: 15,
  }
});