import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ViewClass = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Button
                title={"Back"}
                onPress={() => navigation.goBack() }
            />
            <Text style={styles.text}>ViewClass</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 25,
  }
});

export default ViewClass;
