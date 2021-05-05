import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ViewClass = (props) => {

    return (
      <View style={styles.container}>
          <Text style={styles.text}>ViewClass</Text>
      </View>

    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"grey",
    textAlign: "center",
    width: "90%",
    height: "15%",
    marginTop: 15,
    marginLeft: 19,
    borderRadius: 15,
  }
});

export default ViewClass;
