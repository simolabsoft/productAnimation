import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScrollScreen from "./src/ScrollScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <ScrollScreen></ScrollScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
