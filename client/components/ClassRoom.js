import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ClassRoom() {
  
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
          <View style={styles.nameAndButton}>
            <Text style={styles.details}>ClassName </Text>
            <Button 
                title="view"
                onPress={() => console.log("press")}
            /> 
          </View>
          <Text style={styles.moreDetails}>Active Status: </Text>
          <Text style={styles.moreDetails}>Students: </Text>
          <Text style={styles.moreDetails}>Occurance: </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  details: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  detailContainer: {
    display: "flex",
    marginTop: 25,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#cccccc",
    width: "85%",
    borderRadius: 15,
  },
  nameAndButton: {
      flexDirection: "row",
      justifyContent: "space-between"
  },
  moreDetails: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 14,
  }
});
