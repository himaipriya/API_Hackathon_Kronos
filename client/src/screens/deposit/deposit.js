import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";

const Deposits = () => {
  return (
    <View>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "Happy Save", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
      <Text style={styles.text}>Create Fixed Deposit</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    padding: 20,
  },
});

export default Deposits;
