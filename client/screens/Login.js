import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Login() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="email" />
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  form: {
    paddingTop: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "red",
    height: 40,
    marginBottom: 30,
  },
});
