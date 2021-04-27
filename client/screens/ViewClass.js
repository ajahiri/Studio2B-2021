import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ViewClass = (props) => {

    return (
        <View style={styles.container}>
            <Button
                title={"Back"}
                onPress={() => props.navigation.goBack() }
                // onPress={ () => console.log(props) }
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
